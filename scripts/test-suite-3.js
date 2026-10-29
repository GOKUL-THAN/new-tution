const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const cookies = res.headers['set-cookie'] || [];
        resolve({
          status: res.statusCode,
          headers: res.headers,
          cookies,
          body: data,
          json: () => {
            try {
              return JSON.parse(data);
            } catch (e) {
              return null;
            }
          },
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function extractCookie(cookieArray, name) {
  for (const c of cookieArray) {
    const match = c.match(new RegExp(`${name}=([^;]+)`));
    if (match) return match[1];
  }
  return null;
}

async function runComplexWorkflows() {
  const results = { passed: [], failed: [] };

  async function test(name, fn) {
    try {
      await fn();
      results.passed.push(name);
      console.log(`✅ PASS: ${name}`);
    } catch (err) {
      results.failed.push({ name, error: err.message });
      console.error(`❌ FAIL: ${name} -> ${err.message}`);
    }
  }

  console.log('\n--- TESTING COMPLEX END-TO-END WORKFLOWS ---\n');

  // 1. Password reset request
  await test('Auth: Forgot Password [POST /api/auth/forgot-password]', async () => {
    const res = await request('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'student@demo.com' },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  // 2. Student Auth & Test Taking Workflow
  let studentCookie = '';
  const testStudentEmail = `test_taker_${Date.now()}@example.com`;
  await test('Auth: Register Fresh Student for Test Taking', async () => {
    const res = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        firstName: 'Exam',
        lastName: 'Taker',
        email: testStudentEmail,
        password: 'Password@123',
        role: 'STUDENT',
        phone: '9876543212',
      },
    });
    if (res.status !== 200 && res.status !== 201) throw new Error(`Expected 200/201, got ${res.status}`);
    const token = extractCookie(res.cookies, 'auth_token');
    studentCookie = `auth_token=${token}`;
  });

  // Fetch test list
  let testId = '';
  await test('Tests: List Tests [GET /api/tests]', async () => {
    const res = await request('/api/tests', {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = res.json();
    if (!json.tests || json.tests.length === 0) {
      throw new Error('No tests returned from /api/tests');
    }
    testId = json.tests[0].id;
  });

  // View Test Instructions Page
  await test(`Tests: View Instructions [GET /student/tests/${testId}]`, async () => {
    const res = await request(`/student/tests/${testId}`, {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (res.body.includes('Internal Server Error')) throw new Error('Error rendering instructions page');
  });

  // Start Test Attempt
  let attemptId = '';
  await test(`Tests: Start Attempt [POST /api/tests/${testId}/attempt]`, async () => {
    const res = await request(`/api/tests/${testId}/attempt`, {
      method: 'POST',
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Expected 200/201, got ${res.status}: ${res.body}`);
    }
    const json = res.json();
    if (!json.attempt?.id) throw new Error('Missing attempt ID in response');
    attemptId = json.attempt.id;
  });

  // View CBT Taking Screen
  await test(`Tests: CBT Taking Screen [GET /student/tests/${testId}/take]`, async () => {
    const res = await request(`/student/tests/${testId}/take`, {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // Save Response
  await test(`Tests: Save Response [PATCH /api/attempts/${attemptId}]`, async () => {
    const res = await request(`/api/attempts/${attemptId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: studentCookie,
      },
      body: {
        questionNum: 1,
        selectedIds: ['opt_dummy'],
        flagged: false,
      },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  // Submit Test Attempt
  await test(`Tests: Submit Attempt [POST /api/attempts/${attemptId}/submit]`, async () => {
    const res = await request(`/api/attempts/${attemptId}/submit`, {
      method: 'POST',
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
    const json = res.json();
    if (json.attemptId !== attemptId) throw new Error('Returned attemptId does not match');
  });

  // View Result Breakdown Page
  await test(`Tests: View Result Details [GET /student/results/${attemptId}]`, async () => {
    const res = await request(`/student/results/${attemptId}`, {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (res.body.includes('Internal Server Error')) throw new Error('Error rendering results page');
  });

  // 3. Teacher Workflow
  let teacherCookie = '';
  await test('Auth: Login Teacher', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'teacher@demo.com', password: 'Demo@1234' },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const token = extractCookie(res.cookies, 'auth_token');
    teacherCookie = `auth_token=${token}`;
  });

  // Teacher Question Bank
  await test('Teacher: Question Bank [GET /api/question-bank]', async () => {
    const res = await request('/api/question-bank', {
      headers: { Cookie: teacherCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  // Teacher Create Assignment
  await test('Teacher: Create Assignment [POST /api/teacher/assignments]', async () => {
    const res = await request('/api/teacher/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: teacherCookie,
      },
      body: {
        title: 'Weekly Calculus Problem Set #1',
        instructions: 'Complete all 5 problems showing detailed steps.',
        subjectName: 'Mathematics',
        totalMarks: 50,
        isPublished: true,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Expected 200/201, got ${res.status}: ${res.body}`);
    }
  });

  // 4. Admin Workflow
  let adminCookie = '';
  await test('Auth: Login Admin', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@demo.com', password: 'Demo@1234' },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const token = extractCookie(res.cookies, 'auth_token');
    adminCookie = `auth_token=${token}`;
  });

  // Admin Courses API
  await test('Admin: Course Management [GET /api/admin/courses]', async () => {
    const res = await request('/api/admin/courses', {
      headers: { Cookie: adminCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  // Admin Stats API
  await test('Admin: Analytics Stats [GET /api/admin/stats]', async () => {
    const res = await request('/api/admin/stats', {
      headers: { Cookie: adminCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
    const json = res.json();
    if (typeof json.users?.total !== 'number') {
      throw new Error('Stats missing users.total numeric property');
    }
  });

  console.log('\n=============================================');
  console.log(`COMPLEX WORKFLOW TESTS: ${results.passed.length + results.failed.length}`);
  console.log(`PASSED: ${results.passed.length}`);
  console.log(`FAILED: ${results.failed.length}`);
  console.log('=============================================\n');

  if (results.failed.length > 0) {
    console.log('FAILED DETAILS:');
    console.log(JSON.stringify(results.failed, null, 2));
    process.exit(1);
  } else {
    console.log('🎉 ALL COMPLEX WORKFLOW TESTS PASSED!');
    process.exit(0);
  }
}

runComplexWorkflows().catch((err) => {
  console.error('Fatal workflow test error:', err);
  process.exit(1);
});
