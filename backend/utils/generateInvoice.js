import PDFDocument from "pdfkit";

// Streams a printable invoice/bill PDF directly to the HTTP response.
export const generateInvoicePDF = (order, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=invoice-${order._id}.pdf`);
  doc.pipe(res);

  doc
    .fontSize(22)
    .fillColor("#1F3327")
    .text("Brave Hair Oil", { align: "left" })
    .fontSize(10)
    .fillColor("#555")
    .text("Natural Hair Care | Order Invoice")
    .moveDown(1.5);

  doc
    .fontSize(12)
    .fillColor("#000")
    .text(`Invoice / Order ID: ${order._id}`)
    .text(`Date: ${new Date(order.createdAt).toLocaleString()}`)
    .text(`Status: ${order.status}`)
    .moveDown(1);

  doc
    .fontSize(12)
    .text("Bill To:", { underline: true })
    .text(order.customerName)
    .text(order.phone)
    .text(`${order.address}, ${order.city}`)
    .moveDown(1);

  doc.fontSize(12).text("Items:", { underline: true }).moveDown(0.5);

  order.items.forEach((item) => {
    doc.text(
      `${item.productName} (${item.size})  x${item.quantity}   Rs. ${item.price * item.quantity}`
    );
  });

  doc
    .moveDown(1)
    .fontSize(14)
    .fillColor("#1F3327")
    .text(`Total: Rs. ${order.totalAmount}`, { align: "right" });

  doc
    .moveDown(2)
    .fontSize(10)
    .fillColor("#777")
    .text("Thank you for choosing Brave Hair Oil!", { align: "center" });

  doc.end();
};
