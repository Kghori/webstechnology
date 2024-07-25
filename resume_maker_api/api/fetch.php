<?php
require_once('../api/TCPDF-main/tcpdf.php');
// require("/db.php");

class MYPDF extends TCPDF {
    private $custom_auto_page_break;
    private $custom_bMargin;

    public function Header() 
    {
        $this->custom_auto_page_break = $this->getAutoPageBreak();
        $this->custom_bMargin = $this->getBreakMargin();
        $this->SetAutoPageBreak(false, 0);
        $img_file = K_PATH_IMAGES.'back2.jpg';
        $this->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
        $this->SetAutoPageBreak($this->custom_auto_page_break, $this->custom_bMargin);
        $this->setPageMark();
    }
}

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 051');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(0);
$pdf->SetFooterMargin(0);
$pdf->setPrintFooter(false);
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

$pdf->AddPage();
$html = '<span style="background-color:yellow;color:blue;"></span>';
$pdf->writeHTML($html, true, false, true, false, '');

// Remove default header
$pdf->setPrintHeader(false);

// Set new background image
$bMargin = $pdf->getBreakMargin();
$auto_page_break = $pdf->getAutoPageBreak();
$pdf->SetAutoPageBreak(false, 0);
$img_file = K_PATH_IMAGES.'back2.jpg';
$pdf->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
$pdf->SetAutoPageBreak($auto_page_break, $bMargin);
$pdf->setPageMark();

// Set position for the date
$pdf->SetXY(0, 60);
$pdf->SetFont('helvetica', '', 12);
$pdf->SetTextColor(0, 0, 0);
$pdf->Cell(0, 0, 'Date: ' . date("d-m-Y"), 0, 2, 'R');
require "./partial/db.php";
$fire = new db();
if (isset($_GET['id'])) {
    $id=$_GET['id'];
$data = array("no" => $id);
$msg = $fire->performcurd("st_data", "s", [], $data);
        
    // Add some space between the date and the content
    $pdf->Ln(36);

    // Content HTML
    foreach ($msg as $msg1) {
        $html = '
        <style>
        .content p {
            font-size: 14px;
            color: black;
            font-family: Arial, sans-serif; 
        }
        </style>
        <div class="content">
            <p>This is to certify that the project title '.$msg1['ststname'].' is submitted to Webs Technology, Bhavnagar for the fulfilment of the '.$msg1['stsno'].' semester of '.$msg1['stdegree'].' in '.$msg1['stcourse'].', '.$msg1['stuname'].', '.$msg1['stuloc'].'.</p>
            <p>The project work is carried out by '.$msg1['ststname'].' under the supervision and guidance of '.$msg1['stguidencename'].', Project In-charge, Webs Technology, Bhavnagar between the periods of '.$msg1['ststdate'].' to '.$msg1['steddate'].'.</p>
            <p>We are happy to recommend that '.$msg1['ststname'].' completed the project successfully and will be an asset to any organization that he is going to serve in the future.</p>
            <p>During the period of his project with us, he was punctual, hardworking, and inquisitive. We wish him every success in life.</p>
        </div>';
        
        // Write the HTML content
        $pdf->writeHTML($html, true, false, true, false, '');
    }

    // Output the PDF
    $pdf->Output('example_051.pdf', 'I');
}
?>
