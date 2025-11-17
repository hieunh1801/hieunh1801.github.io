import Alpine from "alpinejs";

interface Sentence {
	id: string | number;
	text: string;
	start: number;
	end: number;
}

interface AudioPlayerState {
	audio: HTMLAudioElement | null;
	sentences: Sentence[];

	mode: "one" | "all";
	currentIndex: number;
	speed: number;
	loopPlaylist: boolean;

	init(): void;
	saveState(): void;
	highlightCurrent(): void;

	setMode(mode: "one" | "all"): void;

	playSentence(start: number, end: number, index: number, isReplay?: boolean): void;
	playCurrentSentence(): void;

	nextSentence(): void;
	prevSentence(): void;
	replay(): void;

	toggle(): void;
	skip(sec: number): void;
	changeSpeed(speed: string | number): void;
}

// Register Alpine component
document.addEventListener("alpine:init", () => {
	Alpine.data(
		"audioPlayer",
		(): AudioPlayerState => ({
			audio: null,
			sentences: [],

			mode: (localStorage.getItem("mode") as "one" | "all") || "one",
			currentIndex: Number(localStorage.getItem("currentIndex") || 0),
			speed: Number(localStorage.getItem("speed") || 1),
			loopPlaylist: JSON.parse(localStorage.getItem("loopPlaylist") || "false"),

			init() {
				this.audio = document.querySelector("#audio") as HTMLAudioElement;
				if (!this.audio) return;

				// @ts-ignore - script được embed từ Astro
				this.sentences = JSON.parse(this.$el.dataset.sentences);

				this.audio.playbackRate = this.speed;
				this.playCurrentSentence();

				this.audio.addEventListener("timeupdate", () => {
					const s = this.sentences[this.currentIndex];
					if (!s) return;

					if (this.audio!.currentTime >= s.end) {
						if (this.mode === "one") {
							this.audio!.currentTime = s.start;
							this.audio!.play();
						} else {
							this.nextSentence();
						}
					}

					this.highlightCurrent();
				});

				window.addEventListener("keydown", (e) => {
					if (e.key === " ") {
						e.preventDefault();
						this.toggle();
					}
					if (e.key === "ArrowRight") this.skip(1);
					if (e.key === "ArrowLeft") this.skip(-1);
					if (e.key === "ArrowUp") this.prevSentence();
					if (e.key === "ArrowDown") this.nextSentence();
					if (e.key === "r") this.replay();
				});
			},

			saveState() {
				localStorage.setItem("mode", this.mode);
				localStorage.setItem("currentIndex", this.currentIndex.toString());
				localStorage.setItem("speed", this.speed.toString());
				localStorage.setItem("loopPlaylist", JSON.stringify(this.loopPlaylist));
			},

			highlightCurrent() {
				this.sentences.forEach((_, i) => {
					const el = document.getElementById(`sentence-${i}`);
					if (el) el.classList.toggle("bg-yellow-200", i === this.currentIndex);
				});

				const active = document.getElementById(`sentence-${this.currentIndex}`);
				active?.scrollIntoView({ behavior: "smooth", block: "center" });
			},

			setMode(mode) {
				this.mode = mode;
				this.saveState();
				this.playCurrentSentence();
			},

			playSentence(start, end, index, isReplay = false) {
				if (!this.audio) return;

				this.audio.currentTime = start;
				this.audio.play();
				this.currentIndex = index;

				// replay không đổi mode
				if (!isReplay) this.mode = "one";

				this.saveState();
				this.highlightCurrent();
			},

			playCurrentSentence() {
				const s = this.sentences[this.currentIndex];
				if (!s) return;
				this.playSentence(s.start, s.end, this.currentIndex);
			},

			nextSentence() {
				this.currentIndex++;

				if (this.currentIndex >= this.sentences.length) {
					if (this.loopPlaylist) {
						this.currentIndex = 0;
					} else {
						this.audio?.pause();
						return;
					}
				}

				this.playCurrentSentence();
			},

			prevSentence() {
				this.currentIndex = Math.max(0, this.currentIndex - 1);
				this.playCurrentSentence();
			},

			replay() {
				const s = this.sentences[this.currentIndex];
				if (!s) return;
				this.playSentence(s.start, s.end, this.currentIndex, true);
			},

			toggle() {
				if (!this.audio) return;
				this.audio.paused ? this.audio.play() : this.audio.pause();
			},

			skip(sec: number) {
				if (!this.audio) return;
				this.audio.currentTime += sec;
			},

			changeSpeed(speed) {
				this.speed = Number(speed);
				if (this.audio) this.audio.playbackRate = this.speed;
				this.saveState();
			},
		}),
	);
});

export {};
