import nodemailer from 'nodemailer';

export async function sendInvoiceEmail(booking) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const html = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
            <h2 style="color:#16a34a;">Service Booking Invoice</h2>
            <p>Hello <strong>${booking.customerInfo.fullName}</strong>,</p>

            <p>Your booking has been successfully placed.</p>

            <table width="100%" border="1" cellspacing="0" cellpadding="8">
                <tr><td><strong>Booking ID</strong></td><td>${booking._id}</td></tr>
                <tr><td><strong>Service</strong></td><td>${booking.serviceName}</td></tr>
                <tr><td><strong>Duration</strong></td>
                    <td>${booking.duration} ${booking.durationType}(s)</td></tr>
                <tr><td><strong>Start Date</strong></td>
                    <td>${new Date(booking.startDate).toDateString()}</td></tr>
                <tr><td><strong>Total Cost</strong></td>
                    <td><strong>৳${booking.totalCost}</strong></td></tr>
                <tr><td><strong>Status</strong></td><td>Pending</td></tr>
            </table>

            <p style="margin-top:16px;">
                We will contact you shortly to confirm your booking.
            </p>

            <hr />
            <small>This is an automated email. Please do not reply.</small>
        </div>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: booking.customerInfo.email,
        subject: `Invoice - ${booking.serviceName}`,
        html
    });
}
