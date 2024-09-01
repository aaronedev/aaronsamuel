<template>
  <div class="block mb-4 bg-editor-background p-4 rounded-lg border border-selection">
    <h3 class="text-accent-blue font-bold text-lg mb-4">
      <i class="fas fa-terminal mr-2" />Fun Fake Shell
    </h3>
    <div class="fake-shell text-terminal-cursor font-mono">
      <p><span class="shell-command">$ echo</span> <span class="shell-output">"Hello, World!"</span><span class="shell-cursor">_</span></p>
      <p><span class="shell-output">Hello, World!</span></p>
      <p><span class="shell-command">$ ls -l</span><span class="shell-cursor">_</span></p>
      <p><span class="shell-output">total 4</span></p>
      <p><span class="file-name">-rw-r--r--</span>  1 user  staff  1048576 Sep 1 12:34 <span class="file-name">README.md</span></p>
      <p><span class="file-name">-rw-r--r--</span>  1 user  staff  1048576 Sep 1 12:34 <span class="file-name">index.html</span></p>
      <p><span class="shell-command">$ git status</span><span class="shell-cursor">_</span></p>
      <p><span class="shell-output">On branch <span class="branch-name">main</span></span></p>
      <p><span class="shell-output">Your branch is up to date with 'origin/<span class="branch-name">main</span>'.</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FakeTerminal",
};
</script>

<style scoped>
.fake-shell {
  background-color: #000;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Ubuntu Sans Mono', monospace;
  color: #00ff00;
}

.shell-command {
  color: #02E4DC;
}

.shell-output {
  color: #00ff00;
}

.file-name {
  color: #ff79c6;
}

.branch-name {
  color: #8be9fd;
}

.shell-cursor {
  display: inline-block;
  width: 10px;
  background-color: #FF338C;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  50.01%, 100% {
    opacity: 0;
  }
}
</style>
