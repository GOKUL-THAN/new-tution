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

async function runDynamicTests() {
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

  console.log('\n--- TESTING DYNAMIC ROUTES & CRITICAL WORKFLOWS ---\n');

  // 1. Dynamic Board Pages
  const boards = ['cbse', 'icse', 'isc', 'tn-state-board', 'tn-matriculation'];
  for (const b of boards) {
    await test(`Dynamic Board Page [GET /boards/${b}]`, async () => {
      const res = await request(`/boards/${b}`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error('Server error rendering board page');
    });
  }

  // 2. Dynamic Class Pages
  const classes = ['class-6', 'class-9', 'class-10', 'class-11', 'class-12'];
  for (const c of classes) {
    await test(`Dynamic Class Page [GET /classes/${c}]`, async () => {
      const res = await request(`/classes/${c}`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error('Server error rendering class page');
    });
  }

  // 3. Dynamic Subject Pages
  const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'english'];
  for (const s of subjects) {
    await test(`Dynamic Subject Page [GET /subjects/${s}]`, async () => {
      const res = await request(`/subjects/${s}`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error('Server error rendering subject page');
    });
  }

  // 4. Dynamic Course Pages
  const courses = [
    'jee-main-physics-complete',
    'neet-biology-cell-genetics',
    'class-10-mathematics-full',
    'free-chemistry-basics-9-10',
    'tn-class-12-physics',
  ];
  for (const c of courses) {
    await test(`Dynamic Course Page [GET /courses/${c}]`, async () => {
      const res = await request(`/courses/${c}`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error('Server error rendering course page');
    });
  }

  // 5. Dynamic Entrance Exam Pages
  const exams = ['jee-main', 'jee-advanced', 'neet-ug', 'bitsat', 'viteee', 'cuet-ug', 'nda'];
  for (const e of exams) {
    await test(`Dynamic Exam Page [GET /entrance-exams/${e}]`, async () => {
      const res = await request(`/entrance-exams/${e}`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      if (res.body.includes('Internal Server Error')) throw new Error('Server error rendering exam page');
    });
  }

  // 6. User Registration & Auth Lifecycle
  const testEmail = `newstudent_${Date.now()}@test.com`;
  let newStudentCookie = '';
  await test(`User Registration [POST /api/auth/register]`, async () => {
    const res = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        firstName: 'Aarav',
        lastName: 'Sharma',
        email: testEmail,
        password: 'Password@123',
        role: 'STUDENT',
        phone: '9876543211',
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Expected 200/201, got ${res.status}: ${res.body}`);
    }
    const token = extractCookie(res.cookies, 'auth_token');
    if (!token) throw new Error('Did not receive auth_token cookie on registration');
    newStudentCookie = `auth_token=${token}`;
  });

  // Verify newly registered user can access dashboard
  await test('New Student Access [GET /student/dashboard]', async () => {
    const res = await request('/student/dashboard', {
      headers: { Cookie: newStudentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // Verify /api/auth/me returns the registered user
  await test('New Student Auth Me [GET /api/auth/me]', async () => {
    const res = await request('/api/auth/me', {
      headers: { Cookie: newStudentCookie },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = res.json();
    if (json.user?.email !== testEmail) {
      throw new Error(`Expected email ${testEmail}, got ${json.user?.email}`);
    }
  });

  // Logout
  await test('User Logout [POST /api/auth/logout]', async () => {
    const res = await request('/api/auth/logout', {
      method: 'POST',
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const hasClearedCookie = res.cookies.some(c => c.includes('auth_token=') && (c.includes('Max-Age=0') || c.includes('Expires=')));
    if (!hasClearedCookie) {
      throw new Error('auth_token should be cleared with Max-Age=0 on logout');
    }
  });

  // 7. Security: Unauthenticated access to protected route redirects to /login
  await test('Security: Protected route without cookie redirects to /login', async () => {
    const res = await request('/student/dashboard');
    if (res.status !== 307 && res.status !== 308 && res.status !== 302) {
      throw new Error(`Expected redirect status (307/308/302), got ${res.status}`);
    }
    const location = res.headers['location'];
    if (!location || !location.includes('/login')) {
      throw new Error(`Expected redirect to /login, got: ${location}`);
    }
  });

  console.log('\n=============================================');
  console.log(`DYNAMIC & LIFECYCLE TESTS: ${results.passed.length + results.failed.length}`);
  console.log(`PASSED: ${results.passed.length}`);
  console.log(`FAILED: ${results.failed.length}`);
  console.log('=============================================\n');

  if (results.failed.length > 0) {
    console.log('FAILED DETAILS:');
    console.log(JSON.stringify(results.failed, null, 2));
    process.exit(1);
  } else {
    console.log('🎉 ALL DYNAMIC TESTS PASSED!');
    process.exit(0);
  }
}

runDynamicTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
