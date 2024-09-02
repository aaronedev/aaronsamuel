<template>
  <div
    class="fake-terminal-container bg-editor-background mb-4 block rounded-lg border border-selection p-4"
  >
    <h3 class="text-accent-blue mb-4 text-lg font-bold">
      <i class="fas fa-terminal mr-2" />Fun Fake Shell
    </h3>
    <div class="fake-shell text-terminal-cursor font-mono">
      <p>
        <span class="shell-command">$ echo</span>
      </p>
      <p>
        <span class="shell-output">Hello, World!</span>
      </p>
      <p>
        <span class="shell-command">$ ls -l</span>
      </p>
      <p>
        <span class="shell-output">total 4</span>
      </p>
      <p>
        <span class="file-name">-rw-r--r--</span> 1 user staff 1048576 Sep 1
        12:34 <span class="file-name">README.md</span>
      </p>
      <p>
        <span class="file-name">-rw-r--r--</span> 1 user staff 1048576 Sep 1
        12:34 <span class="file-name">index.html</span>
      </p>
      <p>
        <span class="shell-command">$ git status</span>
      </p>
      <p>
        <span class="shell-output">
          On branch <span class="branch-name">main</span>
        </span>
      </p>
      <p>
        <span class="shell-output">
          Your branch is up to date with 'origin/<span class="branch-name">main</span>
          '.
        </span>
        <span class="shell-cursor">_</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
	name: "FakeTerminal",
};
</script>

<style scoped>
.fake-terminal-container {
	animation: slideIn 1s ease-in-out;
}

.fake-shell {
	background-color: #000;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
	font-family: "Ubuntu Sans Mono", monospace;
	color: #00ff00;
}

.shell-command {
	color: #02e4dc;
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
	background-color: #ff338c;
	animation: blink 1.5s step-end infinite;
}

/* Typewriter animation */
.typewriter {
	overflow: hidden;
	border-right: 0.15em solid #ff338c;
	white-space: nowrap;
	margin: 0 auto;
	letter-spacing: 0.15em;
	animation:
		typing 3.5s steps(40, end),
		blink 1.5s step-end infinite;
}

@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}

/* Blinking cursor */
@keyframes blink {
	0%,
	50% {
		opacity: 1;
	}
	50.01%,
	100% {
		opacity: 0;
	}
}

/* Slide-in animation */
@keyframes slideIn {
	from {
		transform: translateX(-100%);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}
</style>
