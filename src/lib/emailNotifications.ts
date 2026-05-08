/**
 * Email Notifications via Firebase "Trigger Email from Firestore" extension.
 *
 * Setup:
 * 1. Install the extension in Firebase Console → Extensions →
 *    "Trigger Email from Firestore"
 * 2. Set the collection name to "mail" and provide your SMTP URI.
 *    Gmail:    smtps://info@keegoproperties.in:APP_PASSWORD@smtp.gmail.com:465
 *    SendGrid: smtps://apikey:SENDGRID_API_KEY@smtp.sendgrid.net:465
 * 3. Set Default FROM address to: Keego Properties <info@keegoproperties.in>
 *
 * The extension watches the "mail" collection and sends emails automatically.
 * No extra env variables needed — it all runs server-side inside Firebase.
 */

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TO_EMAIL = "info@keegoproperties.in";

export interface NotificationPayload {
  source: "property_enquiry" | "contact_form";
  subject: string;
  message: string;
  customerName: string;
  customerEmail: string;
  phone?: string;
  budget?: string;
  propertyName?: string;
  lookingTo?: string;
  category?: string;
  subCategory?: string;
}

export interface NotificationResult {
  sent: boolean;
  reason?: string;
}

export const sendEnquiryNotification = async (
  payload: NotificationPayload,
): Promise<NotificationResult> => {
  try {
    const rows = [
      payload.source === "property_enquiry"
        ? `<tr><th>Property</th><td>${payload.propertyName || "—"}</td></tr>`
        : "",
      `<tr><th>Name</th><td>${payload.customerName}</td></tr>`,
      `<tr><th>Email</th><td><a href="mailto:${payload.customerEmail}">${payload.customerEmail}</a></td></tr>`,
      `<tr><th>Phone</th><td>${payload.phone || "—"}</td></tr>`,
      payload.budget ? `<tr><th>Budget</th><td>AED ${payload.budget}</td></tr>` : "",
      payload.lookingTo ? `<tr><th>Looking to</th><td>${payload.lookingTo}</td></tr>` : "",
      payload.category ? `<tr><th>Category</th><td>${payload.category}${payload.subCategory ? ` / ${payload.subCategory}` : ""}</td></tr>` : "",
      payload.message ? `<tr><th>Message</th><td>${payload.message}</td></tr>` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
        <h2 style="color:#1a2744;margin-bottom:4px;">New ${payload.source === "contact_form" ? "Contact Message" : "Property Enquiry"}</h2>
        <p style="color:#6b7280;margin-top:0;">Submitted via Keego Properties website</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody style="color:#111827;">
            ${rows}
          </tbody>
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
        <p style="font-size:12px;color:#9ca3af;">Keego Properties · Business Bay, Dubai, UAE · info@keegoproperties.in</p>
      </div>
    `;

    await addDoc(collection(db, "mail"), {
      to: [TO_EMAIL],
      replyTo: payload.customerEmail,
      message: {
        subject: payload.subject,
        html,
      },
      createdAt: Timestamp.now(),
    });

    return { sent: true };
  } catch (err) {
    console.error("Failed to queue notification email:", err);
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "Unknown error",
    };
  }
};
