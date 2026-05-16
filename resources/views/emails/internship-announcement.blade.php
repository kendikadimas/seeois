<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internship SEEO</title>
</head>
<body style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2>Internship SEEO</h2>
    <p>Halo {{ $application->name }},</p>

    @if($decision === 'accepted')
        <p>Selamat, Anda dinyatakan <strong>diterima</strong> pada program Internship SEEO.</p>
        <p>Tim kami akan menghubungi Anda untuk informasi lanjutan.</p>
    @else
        <p>Terima kasih telah mengikuti proses seleksi Internship SEEO.</p>
        <p>Setelah proses review, saat ini Anda <strong>belum dapat diterima</strong>.</p>
    @endif

    @if(!empty($note))
        <p><strong>Keterangan:</strong> {{ $note }}</p>
    @endif

    <p>Terima kasih.</p>
</body>
</html>
