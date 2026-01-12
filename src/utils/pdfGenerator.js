import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (values, results) => {
    const doc = new jsPDF();
    const today = new Date();

    // Dates & ID
    const dateStr = today.toLocaleDateString('fr-FR');
    const timeStr = today.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', '');
    const devisNum = `DEV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${timeStr}`;

    // --- CONFIG ---
    const margin = 20;
    const pageWidth = 210;
    const pageHeight = 297;
    const rightEdge = pageWidth - margin;

    // Colors
    const accentColor = [37, 99, 235]; // Blue 600
    const black = [15, 23, 42]; // Slate 900
    const grey = [100, 116, 139]; // Slate 500
    const lightGrey = [241, 245, 249]; // Slate 100

    // --- HEADER ---
    // Brand
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...accentColor);
    doc.text("Fil Good", margin, 30);

    doc.setFontSize(10);
    doc.setTextColor(...black);
    doc.text("MOMPER AXEL", margin, 36);
    doc.setFont("helvetica", "medium");
    doc.setTextColor(...grey);
    doc.text("Service d'Impression 3D", margin, 41);

    // Devis Tag (Right)
    doc.setFontSize(32);
    doc.setTextColor(226, 232, 240); // Watermark Grey
    doc.setFont("helvetica", "bold");
    doc.text("DEVIS", rightEdge, 35, { align: "right" });

    // Details
    doc.setFontSize(9);
    doc.setTextColor(...black);
    doc.text(`Réf. ${devisNum}`, rightEdge, 45, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grey);
    doc.text(dateStr, rightEdge, 50, { align: "right" });

    if (values.clientName) {
        doc.text(`Pour : ${values.clientName}`, rightEdge, 55, { align: "right" });
    }

    // --- TABLE ---
    const tableData = [
        [
            values.projectName || "Impression 3D",
            `${results.finalPrice.toFixed(2)} €`
        ]
    ];

    autoTable(doc, {
        startY: 85,
        head: [['DESCRIPTION', 'PRIX']],
        body: tableData,
        theme: 'plain',
        headStyles: {
            fillColor: false,
            textColor: accentColor,
            fontStyle: 'bold',
            fontSize: 9,
            halign: 'left',
        },
        bodyStyles: {
            textColor: black,
            fontSize: 11,
            cellPadding: { top: 12, bottom: 12, left: 0, right: 0 },
            lineColor: lightGrey,
            lineWidth: { bottom: 0.5 }
        },
        columnStyles: {
            0: { cellWidth: 'auto', fontStyle: 'bold' },
            1: { halign: 'right', fontStyle: 'bold', cellWidth: 40 }
        },
        // Custom Header Line
        didDrawPage: (data) => {
            const lineY = data.settings.startY + 8;
            doc.setDrawColor(...accentColor);
            doc.setLineWidth(0.5);
            doc.line(margin, lineY, rightEdge, lineY);
        }
    });

    // --- TOTALS ---
    const finalY = doc.lastAutoTable.finalY + 10;
    const valueX = rightEdge;
    const labelX = rightEdge - 60;

    // Total Net
    doc.setFontSize(11);
    doc.setTextColor(...grey);
    doc.setFont("helvetica", "medium");
    doc.text("Total Net", labelX, finalY + 10);

    doc.setFontSize(20);
    doc.setTextColor(...accentColor);
    doc.setFont("helvetica", "bold");
    doc.text(`${results.finalPrice.toFixed(2)} €`, valueX, finalY + 11, { align: "right" });


    // --- FOOTER & DISCLAIMER ---
    const footerY = pageHeight - 30;

    // Disclaimer Box
    doc.setFillColor(...lightGrey);
    doc.roundedRect(margin, footerY - 10, pageWidth - (margin * 2), 25, 3, 3, 'F');

    doc.setFontSize(8);
    doc.setTextColor(...grey);
    doc.setFont("helvetica", "normal");
    const disclaimer = "Ce devis est estimatif et susceptible d'évoluer selon la disponibilité des filaments et les ajustements techniques nécessaires à la réalisation.";
    doc.text(disclaimer, pageWidth / 2, footerY + 2, { align: "center", maxWidth: pageWidth - 60 });

    // Branding
    doc.setFontSize(7);
    doc.setTextColor(180, 180, 180);
    doc.text("MOMPER AXEL • Service d'Impression 3D", pageWidth / 2, footerY + 10, { align: "center" });

    // Save
    const safeProjectName = (values.projectName || "Projet").replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`Devis_${safeProjectName}.pdf`);
};
