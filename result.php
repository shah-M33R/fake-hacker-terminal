<?php 
include 'includes/header.php'; 
$roll = $_GET['roll'] ?? 'UNKNOWN';
$file = 'assets/data/attendance.json';
$attendance = 'N/A';

if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true);
    if (isset($data[$roll])) {
        $attendance = $data[$roll]['attendance'];
    }
}
?>

<div class="container" style="justify-content: center; align-items: center; text-align: center;">
    <h1 class="glitch success" style="font-size: 4rem; margin: 0;">MISSION COMPLETE</h1>
    <h2 style="color: #fff; margin-top: 10px;">ATTENDANCE UPDATED SUCCESSFULLY</h2>

    <div class="terminal-window" style="height: auto; width: 600px; margin-top: 40px; text-align: left;">
        <div class="output-line">[+] TARGET: <?php echo htmlspecialchars($roll); ?></div>
        <div class="output-line">[+] FIREWALL: BYPASSED</div>
        <div class="output-line">[+] DATABASE: INJECTED</div>
        <div class="output-line">[+] NEW ATTENDANCE: <span class="success" style="font-weight: bold;"><?php echo $attendance; ?>%</span></div>
        <div class="output-line">---------------------------------</div>
        <div class="output-line">LOG CLEARED. TRACE REMOVED.</div>
    </div>

    <div style="margin-top: 40px;">
        <a href="terminal.php" style="margin-right: 20px;">[ RETURN TO TERMINAL ]</a>
        <a href="credits.php">[ VIEW CREDITS ]</a>
    </div>
</div>

<script>
    const audio = new Audio('assets/sounds/access-granted.mp3');
    audio.play().catch(() => {});
</script>
</body>
</html>
