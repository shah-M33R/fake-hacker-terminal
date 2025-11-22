<?php include 'includes/header.php'; ?>

<canvas id="matrix-canvas" style="position: fixed; top: 0; left: 0; z-index: -1;"></canvas>

<div class="container">
    <div class="terminal-window" id="terminal-output">
        <div class="output-line">WELCOME TO HACKER_OS v1.0.4</div>
        <div class="output-line">TYPE 'help' FOR COMMAND LIST.</div>
        <div class="output-line">---------------------------------</div>
    </div>

    <div class="input-area">
        <span class="prompt">root@hacker:~$</span>
        <input type="text" id="command-input" autocomplete="off" autofocus>
    </div>
</div>

<form id="hack-form" action="actions.php" method="POST" class="hidden">
    <input type="hidden" name="roll" id="roll-input">
</form>

<script src="assets/js/matrix.js"></script>
<script src="assets/js/terminal.js"></script>
</body>
</html>
