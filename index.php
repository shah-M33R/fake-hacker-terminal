<?php include 'includes/header.php'; ?>

<div class="container" style="justify-content: center; align-items: center;">
    <div class="tech-border">
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
        
        <div class="system-status">SYSTEM STATUS: <span class="blink">ONLINE</span></div>

        <div class="terminal-window" style="height: auto; width: 600px; text-align: center; border: none; box-shadow: none;">
            <h1 class="glitch" style="margin-bottom: 40px;">SECURE LOGIN</h1>
            
            <div id="login-logs" style="text-align: left; margin-bottom: 20px; min-height: 150px;"></div>

            <div class="input-area" style="justify-content: center;">
                <span class="prompt">USER &gt;</span>
                <input type="text" id="login-input" autocomplete="off" autofocus>
                <input type="password" id="password-input" autocomplete="off" class="hidden">
            </div>
        </div>
    </div>
</div>

<script src="assets/js/login.js"></script>
</body>
</html>
