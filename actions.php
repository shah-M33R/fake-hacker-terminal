<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $roll = $_POST['roll'] ?? '';
    $file = 'assets/data/attendance.json';

    if (file_exists($file)) {
        $json = file_get_contents($file);
        $data = json_decode($json, true);

        if (isset($data[$roll])) {
            // Hack: Increase attendance by random amount
            $increase = rand(5, 15);
            $data[$roll] += $increase;
            if ($data[$roll] > 100) $data[$roll] = 100;

            file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
            
            // Redirect to result
            header("Location: result.php?roll=" . urlencode($roll) . "&success=1");
            exit;
        }
    }
}

// Fallback if something fails
header("Location: terminal.php?error=1");
exit;
