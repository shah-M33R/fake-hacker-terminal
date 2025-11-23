<?php include 'includes/header.php'; ?>

<canvas id="matrix-canvas" style="position: fixed; top: 0; left: 0; z-index: -1;"></canvas>

<div class="container">
    <div class="terminal-window" id="terminal-output">
        <div class="output-line">WELCOME TO HACKER_OS v1.0.4</div>
        <div class="output-line">TYPE 'help' FOR COMMAND LIST.</div>
        <div class="output-line">---------------------------------</div>
    </div>

    <div class="terminal-input">
        <span class="prompt">root@hacker:~$</span>
        <input type="text" id="command-input" autocomplete="off" autofocus>
    </div>
</div>



<script src="assets/js/matrix.js"></script>
<script src="assets/js/terminal.js"></script>
</body>
</html>
