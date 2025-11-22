<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $roll = $_POST['roll'] ?? '';
    $file = 'assets/data/attendance.json';

    if (file_exists($file)) {
        $json = file_get_contents($file);
        $data = json_decode($json, true);

        if (isset($data[$roll])) {
            // Steal Attendance Logic
            $stolenAmount = 0;
            
            foreach ($data as $id => &$student) {
                if ($id !== $roll) {
                    // Steal 1-3 days from others
                    $steal = rand(1, 3);
                    if ($student['attendance'] > 5) {
                        $student['attendance'] -= $steal;
                        $stolenAmount += $steal;
                    }
                }
            }
            
            // Add stolen amount to hacker
            $data[$roll]['attendance'] += $stolenAmount;
            if ($data[$roll]['attendance'] > 100) $data[$roll]['attendance'] = 100; // Cap at 100 (or maybe more for fun?)

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
