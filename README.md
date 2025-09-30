# Security-Guideline

## MERN Security Demo CRM

This project demonstrates common web attacks and their mitigations in a MERN stack CRM app. It includes both vulnerable and secure implementations, mapped to attack/defense IDs for educational purposes.

See `slides/` for presentation outline and attack/defense mapping.

---

## OWASP Top 10 Vulnerabilities and Mitigations (2021)

### 1. Broken Access Control (A01:2021)

- **Description**: Improper enforcement of access restrictions, allowing unauthorized actions or data access.
- **Attack Strategy**: Exploiting misconfigured permissions or bypassing access controls.
- **Defense**: Enforce least privilege, deny access by default, and implement robust access control mechanisms.

### 2. Cryptographic Failures (A02:2021)

- **Description**: Weak or missing cryptographic protections for sensitive data.
- **Attack Strategy**: Intercepting unencrypted data or exploiting weak encryption algorithms.
- **Defense**: Use strong encryption for data at rest and in transit, and ensure proper key management.

### 3. Injection (A03:2021)

- **Description**: Injection flaws occur when untrusted data is sent to an interpreter.
- **Attack Strategy**: Exploiting input fields to execute malicious queries or commands.
- **Defense**: Use parameterized queries, input validation, and output encoding.

### 4. Insecure Design (A04:2021)

- **Description**: Security flaws introduced during the design phase of the application.
- **Attack Strategy**: Exploiting weak architectural decisions or lack of threat modeling.
- **Defense**: Incorporate secure design principles and perform regular threat modeling.

### 5. Security Misconfiguration (A05:2021)

- **Description**: Insecure default configurations or incomplete configurations expose vulnerabilities.
- **Attack Strategy**: Exploiting misconfigured servers, frameworks, or APIs.
- **Defense**: Regularly update and patch systems, and use secure headers.

### 6. Vulnerable and Outdated Components (A06:2021)

- **Description**: Using libraries, frameworks, or other software with known vulnerabilities.
- **Attack Strategy**: Exploiting outdated or vulnerable components.
- **Defense**: Regularly update dependencies and use tools to identify vulnerabilities.

### 7. Identification and Authentication Failures (A07:2021)

- **Description**: Weak authentication mechanisms allow attackers to compromise user accounts.
- **Attack Strategy**: Brute force, session hijacking, or credential stuffing.
- **Defense**: Implement secure password storage, multi-factor authentication, and secure session management.

### 8. Software and Data Integrity Failures (A08:2021)

- **Description**: Integrity issues in software updates, CI/CD pipelines, or critical data.
- **Attack Strategy**: Exploiting unverified updates or manipulating data.
- **Defense**: Use digital signatures, secure CI/CD pipelines, and integrity checks.

### 9. Security Logging and Monitoring Failures (A09:2021)

- **Description**: Lack of logging and monitoring allows attackers to achieve their goals without detection.
- **Attack Strategy**: Exploiting the absence of monitoring to remain undetected.
- **Defense**: Implement comprehensive logging and real-time monitoring.

### 10. Server-Side Request Forgery (SSRF) (A10:2021)

- **Description**: SSRF flaws occur when an application fetches a remote resource without validating the user-supplied URL.
- **Attack Strategy**: Exploiting SSRF to access internal systems or sensitive data.
- **Defense**: Validate and sanitize URLs, and enforce network segmentation.

---

## Tools and Their Coverage

| Tools                                      | Guidelines Addressed | Vulnerabilities Addressed |
| ------------------------------------------ | -------------------- | ------------------------- |
| **JWT middleware**                   | G4, G8               | A01, A07                  |
| **bcrypt**                           | G3                   | A02, A07                  |
| **mongoose (parameterized queries)** | G1, G2               | A03                       |
| **Draw.io**                          | G4                   | A04                       |
| **dotenv**                           | G6                   | A05                       |
| **npm audit or GitHub bot**          | G6, G10              | A06                       |
| **Passport.js**                      | G4, G7               | A07                       |
| **jsonwebtoken**                     | G4, G8               | A01, A07                  |
| **GitHub Actions hardening**         | G10                  | A08                       |

---

## Security Guidelines (G1–G10)

1. **G1: Input validation & output encoding**

   - Ensure all user inputs are validated and properly encoded before processing or displaying.
   - **Source**: OWASP Input Validation Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html))
2. **G2: Parameterized queries**

   - Use parameterized queries to prevent SQL injection and other injection attacks.
   - **Source**: OWASP SQL Injection Prevention Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html))
3. **G3: Safe password storage**

   - Store passwords securely using strong hashing algorithms like bcrypt.
   - **Source**: OWASP Password Storage Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html))
4. **G4: Secure session/token management**

   - Implement secure session handling and token-based authentication mechanisms.
   - **Source**: OWASP Session Management Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html))
5. **G5: CSRF protection**

   - Use anti-CSRF tokens to protect against cross-site request forgery attacks.
   - **Source**: OWASP Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html))
6. **G6: CORS least privilege**

   - Configure Cross-Origin Resource Sharing (CORS) policies to allow only trusted origins.
   - **Source**: OWASP CORS Security Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/CORS_Validation_Cheat_Sheet.html))
7. **G7: Rate limiting & lockout mechanisms**

   - Implement rate limiting and account lockout mechanisms to prevent brute force attacks.
   - **Source**: OWASP Authentication Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html))
8. **G8: Principle of least privilege**

   - Ensure users and services have the minimum permissions necessary to perform their tasks.
   - **Source**: NIST Principle of Least Privilege ([link](https://csrc.nist.gov/glossary/term/least_privilege))
9. **G9: Content Security Policy (CSP) & secure headers**

   - Use CSP and other secure headers to prevent XSS and other client-side attacks.
   - **Source**: OWASP Secure Headers Project ([link](https://owasp.org/www-project-secure-headers/))
10. **G10: Logging & monitoring**

    - Implement comprehensive logging and monitoring to detect and respond to security incidents.
    - **Source**: OWASP Logging Cheat Sheet ([link](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html))

---

## Presentation Outline

1. **Introduction**: Cyber law and security relevance in MERN stack apps.
2. **Attack IDs (A01–A10) vs Defense IDs (G1–G10)**.
3. **Insecure Demo**: Demonstrate vulnerabilities (A01–A10).
4. **Secure Demo**: Show mitigations (G1–G10).
5. **Guidelines Walkthrough**: Explain each guideline with IDs.
6. **Conclusion**: Checklist for secure development.





# Presentation Outline

1. Intro: Cyber law + security relevance in MERN stack apps.
2. Present attack IDs (A1–A8) vs defense IDs (G1–G10).
3. Show insecure demo (A1–A8).
4. Show secure demo (G1–G10).
5. Walk through guidelines with IDs.
6. Conclude with checklist.

## Attack/Defense Mapping

| ID  | Guideline                          | Attack Prevented |
| --- | ---------------------------------- | ---------------- |
| G1  | Input validation & output encoding | A1, A2           |
| G2  | Parameterized queries              | A3               |
| G3  | Safe password storage              | A5               |
| G4  | Secure session/token               | A5, A6           |
| G5  | CSRF protection                    | A4               |
| G6  | CORS least privilege               | A4               |
| G7  | Rate limiting & lockout            | A7               |
| G8  | Principle of least privilege       | A6               |
| G9  | CSP & secure headers               | A1, A2           |
| G10 | Logging & monitoring               | A8               |
