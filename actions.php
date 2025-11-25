<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $roll = $_POST['roll'] ?? '';
    $file = 'assets/data/attendance.json';

    if (file_exists($file)) {
        $json = file_get_contents($file);
        $data = json_decode($json, true);

        if (isset($data[$roll])) {
            $targetAmount = isset($_POST['amount']) ? (int)$_POST['amount'] : 0;
            $stolenSoFar = 0;
            
            $otherIds = [];
            foreach ($data as $id => $student) {
                if ($id !== $roll && $student['attendance'] > 0) {
                    $otherIds[] = $id;
                }
            }

            while ($stolenSoFar < $targetAmount && count($otherIds) > 0) {
                $randomIndex = array_rand($otherIds);
                $victimId = $otherIds[$randomIndex];
                
                if ($data[$victimId]['attendance'] > 0) {
                    $data[$victimId]['attendance']--;
                    $stolenSoFar++;
                } else {
                    unset($otherIds[$randomIndex]); 
                    $otherIds = array_values($otherIds); 
                }
            }
            
            $data[$roll]['attendance'] += $stolenSoFar;
            if ($data[$roll]['attendance'] > 100) $data[$roll]['attendance'] = 100;

            file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
            
            header("Location: result.php?roll=" . urlencode($roll) . "&success=1");
            exit;
        }
    }
}

// Fallback if something fails
header("Location: terminal.php?error=1");
exit;
