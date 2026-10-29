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

async function runTests() {
  const results = {
    passed: [],
    failed: [],
  };

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

  console.log('\n--- STARTING AUTOMATED TEST SUITE ---\n');

  // 1. PUBLIC PAGES
  const publicPages = [
    '/',
    '/about',
    '/admissions',
    '/answer-keys',
    '/batches',
    '/blog',
    '/boards',
    '/career-paths',
    '/classes',
    '/college-guide',
    '/contact',
    '/content-licensing',
    '/cookie-policy',
    '/courses',
    '/curriculum',
    '/diagnostic-test',
    '/entrance-exams',
    '/exam-calendar',
    '/faq',
    '/forgot-password',
    '/free-resources',
    '/jee',
    '/jee-advanced',
    '/jee-main',
    '/login',
    '/ncert-solutions',
    '/neet',
    '/official-resources',
    '/offline-classes',
    '/olympiads',
    '/online-learning',
    '/practice',
    '/previous-year-papers',
    '/privacy',
    '/refund-policy',
    '/register',
    '/results',
    '/scholarships',
    '/school-tuition',
    '/study-planner',
    '/subjects',
    '/terms',
  ];

  for (const page of publicPages) {
    await test(`Public Page [GET ${page}]`, async () => {
      const res = await request(page);
      if (res.status !== 200) {
        throw new Error(`Expected 200, got ${res.status}`);
      }
      if (res.body.includes('Internal Server Error') || res.body.includes('Application error')) {
        throw new Error(`Page contains server error`);
      }
    });
  }

  // 2. PUBLIC APIS
  const publicApis = [
    '/api/health',
    '/api/ready',
    '/api/boards',
    '/api/classes',
    '/api/subjects',
    '/api/courses',
    '/api/exams',
    '/api/resources',
    '/api/teachers',
  ];

  for (const api of publicApis) {
    await test(`Public API [GET ${api}]`, async () => {
      const res = await request(api);
      if (res.status !== 200) {
        throw new Error(`Expected 200, got ${res.status}`);
      }
      const json = res.json();
      if (!json) throw new Error(`Expected JSON response, got invalid JSON`);
    });
  }

  // 3. CONTACT / ENQUIRY API
  await test('Contact Enquiry API [POST /api/enquiries]', async () => {
    const res = await request('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Test Student',
        email: 'test_student@example.com',
        phone: '9876543210',
        studentClass: 'Class 10',
        board: 'CBSE',
        interest: 'School Tuition',
        message: 'Interested in Class 10 CBSE Maths and Science tuition.',
        consentGiven: true,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Expected 200/201, got ${res.status}: ${res.body}`);
    }
  });

  // 4. AUTH FLOW - STUDENT
  let studentCookie = '';
  await test('Auth - Login Student', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'student@demo.com',
        password: 'Demo@1234',
      },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
    const token = extractCookie(res.cookies, 'auth_token');
    if (!token) throw new Error('Missing auth_token cookie in response');
    studentCookie = `auth_token=${token}`;
  });

  // Student protected pages
  const studentPages = [
    '/student/dashboard',
    '/student/my-courses',
    '/student/tests',
    '/student/progress',
    '/student/study-planner',
    '/student/doubt-support',
    '/student/notifications',
    '/student/profile',
  ];

  for (const page of studentPages) {
    await test(`Student Portal Page [GET ${page}]`, async () => {
      const res = await request(page, {
        headers: { Cookie: studentCookie },
      });
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error(`Server error rendering page`);
    });
  }

  // Student APIs
  await test('Student API [GET /api/student/profile]', async () => {
    const res = await request('/api/student/profile', {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  await test('Student API [GET /api/student/progress]', async () => {
    const res = await request('/api/student/progress', {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  await test('Student API [GET & POST /api/student/study-planner]', async () => {
    // First create or update a plan
    const postRes = await request('/api/student/study-planner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: studentCookie,
      },
      body: {
        title: 'Board Exam Revision Schedule',
        data: {
          weekly: {
            Monday: [{ subject: 'Mathematics', topic: 'Calculus', duration: '2h' }],
          },
        },
      },
    });
    if (postRes.status !== 200 && postRes.status !== 201) {
      throw new Error(`Expected 200/201, got ${postRes.status}: ${postRes.body}`);
    }

    const res = await request('/api/student/study-planner', {
      headers: { Cookie: studentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  // 5. AUTH FLOW - TEACHER
  let teacherCookie = '';
  await test('Auth - Login Teacher', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'teacher@demo.com',
        password: 'Demo@1234',
      },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
    const token = extractCookie(res.cookies, 'auth_token');
    if (!token) throw new Error('Missing auth_token cookie in response');
    teacherCookie = `auth_token=${token}`;
  });

  const teacherPages = [
    '/teacher/dashboard',
    '/teacher/classes',
    '/teacher/students',
    '/teacher/assignments',
    '/teacher/question-bank',
    '/teacher/tests',
    '/teacher/attendance',
    '/teacher/profile',
  ];

  for (const page of teacherPages) {
    await test(`Teacher Portal Page [GET ${page}]`, async () => {
      const res = await request(page, {
        headers: { Cookie: teacherCookie },
      });
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error(`Server error rendering page`);
    });
  }

  // Teacher APIs
  await test('Teacher API [GET /api/teacher/profile]', async () => {
    const res = await request('/api/teacher/profile', {
      headers: { Cookie: teacherCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  await test('Teacher API [GET /api/teacher/assignments]', async () => {
    const res = await request('/api/teacher/assignments', {
      headers: { Cookie: teacherCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  await test('Teacher API [GET /api/teacher/attendance]', async () => {
    const res = await request('/api/teacher/attendance', {
      headers: { Cookie: teacherCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  // 6. AUTH FLOW - PARENT
  let parentCookie = '';
  await test('Auth - Login Parent', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'parent@demo.com',
        password: 'Demo@1234',
      },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
    const token = extractCookie(res.cookies, 'auth_token');
    if (!token) throw new Error('Missing auth_token cookie in response');
    parentCookie = `auth_token=${token}`;
  });

  const parentPages = [
    '/parent/dashboard',
    '/parent/children',
    '/parent/progress',
    '/parent/assignments',
    '/parent/test-results',
    '/parent/attendance',
    '/parent/fees',
    '/parent/notifications',
    '/parent/settings',
  ];

  for (const page of parentPages) {
    await test(`Parent Portal Page [GET ${page}]`, async () => {
      const res = await request(page, {
        headers: { Cookie: parentCookie },
      });
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error(`Server error rendering page`);
    });
  }

  // 7. AUTH FLOW - ADMIN
  let adminCookie = '';
  await test('Auth - Login Admin', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'admin@demo.com',
        password: 'Demo@1234',
      },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
    const token = extractCookie(res.cookies, 'auth_token');
    if (!token) throw new Error('Missing auth_token cookie in response');
    adminCookie = `auth_token=${token}`;
  });

  const adminPages = [
    '/admin',
    '/admin/users',
    '/admin/courses',
    '/admin/curriculum',
    '/admin/question-bank',
    '/admin/exams',
    '/admin/enquiries',
    '/admin/payments',
    '/admin/notifications',
    '/admin/audit-logs',
    '/admin/health',
    '/admin/settings',
    '/admin/boards',
    '/admin/subjects',
  ];

  for (const page of adminPages) {
    await test(`Admin Portal Page [GET ${page}]`, async () => {
      const res = await request(page, {
        headers: { Cookie: adminCookie },
      });
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error(`Server error rendering page`);
    });
  }

  // Admin APIs
  await test('Admin API [GET /api/admin/stats]', async () => {
    const res = await request('/api/admin/stats', {
      headers: { Cookie: adminCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  await test('Admin API [GET /api/admin/users]', async () => {
    const res = await request('/api/admin/users', {
      headers: { Cookie: adminCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  await test('Admin API [GET /api/admin/enquiries]', async () => {
    const res = await request('/api/admin/enquiries', {
      headers: { Cookie: adminCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}: ${res.body}`);
  });

  console.log('\n=============================================');
  console.log(`TOTAL TESTS: ${results.passed.length + results.failed.length}`);
  console.log(`PASSED: ${results.passed.length}`);
  console.log(`FAILED: ${results.failed.length}`);
  console.log('=============================================\n');

  if (results.failed.length > 0) {
    console.log('FAILED DETAILS:');
    console.log(JSON.stringify(results.failed, null, 2));
    process.exit(1);
  } else {
    console.log('🎉 ALL TESTS PASSED!');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
