
// src/services/emailService.ts
class EmailService {
  async sendEmail(to: string, subject: string, body: string) {
    console.log(`---- Sending Email ----`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    console.log(`-----------------------`);
    return Promise.resolve();
  }
}

export const emailService = new EmailService();
