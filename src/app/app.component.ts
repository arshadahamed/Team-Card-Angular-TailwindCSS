import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('modalVideo') modalVideoElement!: ElementRef<HTMLVideoElement>;

  cardData: { name: string; prev: string; next: string }[] = [];

  personalData = [
    {
      name: 'Andrew Rotz',
      img: 'https://cdn.prod.website-files.com/65b22d2d8aafb9c10048b930/67d8b625b6c27444ff25ef19_20250317_Frutiful_Guide_Headshot_Andrea.png',
      video: 'https://d1pwidzl9kib4u.cloudfront.net/marketing/20240305/4x3_Low_Quality_Low_Captions/20240304_Fruitful_Guide_4x3_Andrea_sm_locap.mp4',
      tags: ['💬 Conversational', '💼 Dedicated', '🌈 Open-minded'],
      subtitle: 'Expert in Sustainable Tourism',
      description: 'Andrew is a seasoned guide specializing in sustainable travel and eco-friendly adventures. With over a decade of experience, he brings passion and deep knowledge to every tour.'
    },
    {
      name: 'Alli Hershey',
      img: 'https://cdn.prod.website-files.com/65b22d2d8aafb9c10048b930/67d87483f61390a6275de462_20250317_Frutiful_Guide_Headshot_Alli.png',
      video: 'https://d1pwidzl9kib4u.cloudfront.net/marketing/20240612/Alli+Hershey/Video/Low+Quality/20240612_Fruitful_Video_Guide_Bio_Alli_Hershey_16x9_LQ_LC.mp4',
      tags: ['🌟 Enthusiastic', '🧠 Thoughtful', '💪 Motivated'],
      subtitle: 'Cultural Heritage Specialist',
      description: 'Alli brings vibrant energy and a thoughtful approach to cultural tours, ensuring visitors experience authentic local heritage while respecting traditions.'
    },
    {
      name: 'Angela Moore',
      img: 'https://cdn.prod.website-files.com/65b22d2d8aafb9c10048b930/67d87f8ceb5d51b9abc55c8e_20250317_Frutiful_Guide_Headshot_Bri.png',
      video: 'https://d1pwidzl9kib4u.cloudfront.net/marketing/20240305/4x3_Low_Quality_Low_Captions/20240304_Fruitful_Guide_4x3_Bri_sm_locap.mp4',
      tags: ['🎯 Focused', '📚 Knowledgeable', '🌟 Insightful'],
      subtitle: 'Adventure Travel Coordinator',
      description: 'Angela coordinates exhilarating adventure trips tailored to thrill-seekers. Her deep knowledge of the terrain ensures safety and excitement.'
    },
    {
      name: 'Jonathan Smith',
      img: 'https://cdn.prod.website-files.com/65b22d2d8aafb9c10048b930/67d8b5cf20502fa98d55b9ff_20250317_Frutiful_Guide_Headshot_Andrew.png',
      video: 'https://d1pwidzl9kib4u.cloudfront.net/marketing/20240305/4x3_Low_Quality_Low_Captions/20240304_Fruitful_Guide_4x3_Andrew_sm_locap.mp4',
      tags: ['🎯 Focused', '📚 Knowledgeable', '🌟 Insightful'],
      subtitle: 'CFP® Professional',
      description: 'Andrew has worked in financial services since 2012. He loves seeing the relief that comes when he helps his Members alleviate a major stressor in their financial lives. He\'s worked at Fidelity Investments, built a bespoke financial wellness program at NC State University, and his own firm while also serving in the US Navy. He loves exploring the Star Wars world with his two boys, traveling around the real world, and history!'
    },
    {
      name: 'Colin Bishop',
      img: 'https://cdn.prod.website-files.com/65b22d2d8aafb9c10048b930/67e1bb01ab737a97df80b4d2_20230726_FF_guide_headshot_colin_FEE9D1.png',
      video: 'https://d1pwidzl9kib4u.cloudfront.net/marketing/20240305/4x3_Low_Quality_Low_Captions/20240304_Fruitful_Guide_4x3_Colin_sm_locap.mp4',
      tags: ['❤️ Empathetic', '🤝 Collaborative', '📚 Resourceful'],
      subtitle: 'CFP® Professional',
      description: 'Colin has 11 years of planning and advising experience. He’s passionate about building people’s confidence to pursue their financial goals while saving them time and energy. He previously worked at Morgan Stanley before building his own financial planning firm. He loves soccer, volleyball, and hiking with his partner, Ali.'
    },
    {
      name: 'Andrew Rotz',
      img: 'https://cdn.prod.website-files.com/65b22d2d8aafb9c10048b930/67d8b625b6c27444ff25ef19_20250317_Frutiful_Guide_Headshot_Andrea.png',
      video: 'https://d1pwidzl9kib4u.cloudfront.net/marketing/20240305/4x3_Low_Quality_Low_Captions/20240304_Fruitful_Guide_4x3_Andrea_sm_locap.mp4',
      tags: ['💬 Conversational', '💼 Dedicated', '🌈 Open-minded'],
      subtitle: 'Expert in Sustainable Tourism',
      description: 'Andrew is a seasoned guide specializing in sustainable travel and eco-friendly adventures. With over a decade of experience, he brings passion and deep knowledge to every tour.'
    },
  ];

  currentCardIndex = 0;
  targetX = 0;
  targetY = 0;
  currentX = 0;
  currentY = 0;
  animationId: number | null = null;
  floatingNameVisible = false;
  floatingNameText = '';
  floatingNameStyle = { left: '0px', top: '0px' };

  selectedPerson: any = null;
  showModal = false;
  hoveredCardIndex: number | null = null;

  // Modal video states
  modalVideoLoaded = false;
  modalVideoError = false;
  isVideoPlaying = false;
  isVideoMuted = false; // Start unmuted as requested

  // Card hover video states
  cardVideoLoaded = false;
  cardVideoError = false;

  private readonly FLOATING_TAG_CONFIG = {
    spacing: 20,
    width: 150,
    height: 50,
    margin: 10,
    smoothFactor: 0.15
  };

  constructor() {}

  ngOnInit(): void {
    this.handleResize();
    this.cardData = this.personalData.map((person, index, arr) => {
      const prev = arr[(index - 1 + arr.length) % arr.length].name;
      const next = arr[(index + 1) % arr.length].name;
      return {
        name: person.name,
        prev,
        next
      };
    });
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    document.body.style.overflow = 'auto';
  }

  // ===== MODAL METHODS =====
  openModal(index: number): void {
    if (index < 0 || index >= this.personalData.length) return;

    this.selectedPerson = this.personalData[index];
    this.currentCardIndex = index;
    this.showModal = true;

    // Reset modal video states
    this.modalVideoLoaded = false;
    this.modalVideoError = false;
    this.isVideoPlaying = false;
    this.isVideoMuted = false; // Start unmuted

    document.body.style.overflow = 'hidden';

    // Initialize video with delay
    setTimeout(() => {
      this.initializeModalVideo();
    }, 150);

    console.log('Opening modal for:', this.selectedPerson.name);
  }

  closeModal(): void {
    // Pause video before closing
    this.pauseModalVideo();

    this.showModal = false;
    this.selectedPerson = null;
    this.modalVideoLoaded = false;
    this.modalVideoError = false;
    this.isVideoPlaying = false;
    document.body.style.overflow = 'auto';

    console.log('Modal closed');
  }

  prevCard(): void {
    const prevIndex = this.currentCardIndex > 0
      ? this.currentCardIndex - 1
      : this.personalData.length - 1;
    this.openModal(prevIndex);
  }

  nextCard(): void {
    const nextIndex = this.currentCardIndex < this.personalData.length - 1
      ? this.currentCardIndex + 1
      : 0;
    this.openModal(nextIndex);
  }

  // Initialize modal video
  private initializeModalVideo(): void {
    const modal = document.getElementById('modal');
    if (!modal || !this.selectedPerson?.video) {
      console.log('Modal or video not found for initialization');
      return;
    }

    const video = modal.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      video.currentTime = 0;
      video.muted = this.isVideoMuted;
      video.loop = true;
      video.preload = 'metadata';
      video.load();

      console.log('Initializing modal video for:', this.selectedPerson.name);
    }
  }

  // Auto-play video when loaded
  private async autoPlayVideo(): Promise<void> {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const video = modal.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      try {
        // Set video properties
        video.muted = this.isVideoMuted;
        video.currentTime = 0;

        // Attempt to play
        await video.play();
        this.isVideoPlaying = true;
        console.log('✅ Modal video auto-playing for:', this.selectedPerson?.name);
      } catch (error) {
        console.error('❌ Auto-play failed:', error);
        this.isVideoPlaying = false;
      }
    }
  }

  // ===== VIDEO CONTROL METHODS =====
  toggleVideoPlayPause(): void {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const video = modal.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      if (this.isVideoPlaying) {
        video.pause();
        this.isVideoPlaying = false;
        console.log('Video paused');
      } else {
        video.play().then(() => {
          this.isVideoPlaying = true;
          console.log('Video playing');
        }).catch(error => {
          console.error('Play failed:', error);
        });
      }
    }
  }

  toggleVideoMute(): void {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const video = modal.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      this.isVideoMuted = !this.isVideoMuted;
      video.muted = this.isVideoMuted;
      console.log('Video', this.isVideoMuted ? 'muted' : 'unmuted');
    }
  }

  private pauseModalVideo(): void {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const video = modal.querySelector('.modal-video') as HTMLVideoElement;
    if (video) {
      video.pause();
      this.isVideoPlaying = false;
    }
  }

  // ===== MODAL VIDEO EVENT HANDLERS =====
  onModalVideoLoaded(): void {
    this.modalVideoLoaded = true;
    this.modalVideoError = false;
    console.log('✅ Modal video loaded successfully for:', this.selectedPerson?.name);

    // Auto-play the video when loaded
    setTimeout(() => {
      this.autoPlayVideo();
    }, 100);
  }

  onModalVideoError(event: Event): void {
    this.modalVideoError = true;
    this.modalVideoLoaded = false;
    this.isVideoPlaying = false;
    console.error('❌ Modal video failed to load for:', this.selectedPerson?.name, event);
  }

  onModalVideoCanPlay(): void {
    this.modalVideoLoaded = true;
    this.modalVideoError = false;
    console.log('✅ Modal video can play for:', this.selectedPerson?.name);

    // Auto-play when ready
    if (!this.isVideoPlaying) {
      setTimeout(() => {
        this.autoPlayVideo();
      }, 50);
    }
  }

  // Helper methods for navigation
  getPrevPersonName(): string {
    if (!this.personalData.length) return '';

    const prevIndex = this.currentCardIndex > 0
      ? this.currentCardIndex - 1
      : this.personalData.length - 1;
    return this.personalData[prevIndex]?.name || '';
  }

  getNextPersonName(): string {
    if (!this.personalData.length) return '';

    const nextIndex = this.currentCardIndex < this.personalData.length - 1
      ? this.currentCardIndex + 1
      : 0;
    return this.personalData[nextIndex]?.name || '';
  }

  // ===== CARD HOVER VIDEO METHODS (existing methods remain the same) =====
  async onCardEnter(name: string, index: number, event: Event): Promise<void> {
    this.floatingNameVisible = true;
    this.floatingNameText = name;
    this.hoveredCardIndex = index;
    this.animateNameTag();

    const card = (event.target as Element).closest('.card');
    if (card) {
      const video = card.querySelector('video') as HTMLVideoElement;
      const img = card.querySelector('img') as HTMLImageElement;
      const loader = card.querySelector('.loading-spin') as HTMLElement;

      if (video && img) {
        try {
          console.log('Starting card video playback for:', name);

          if (loader) {
            loader.style.opacity = '1';
          }

          video.muted = true;
          video.volume = 0;
          video.playsInline = true;
          video.preload = 'metadata';
          video.currentTime = 0;

          await this.waitForVideoReady(video);

          if (loader) {
            loader.style.opacity = '0';
          }

          const playPromise = video.play();

          if (playPromise !== undefined) {
            await playPromise;
            console.log('Card video playing successfully');
            video.style.opacity = '1';
            img.style.opacity = '0';
          }

        } catch (error) {
          console.error('Card video playback failed:', error);
          if (loader) {
            loader.style.opacity = '0';
          }
          video.style.opacity = '0';
          img.style.opacity = '1';
        }
      }
    }
  }

  private waitForVideoReady(video: HTMLVideoElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (video.readyState >= 2) {
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        video.removeEventListener('loadeddata', onReady);
        video.removeEventListener('canplay', onReady);
        video.removeEventListener('error', onError);
        reject(new Error('Video load timeout'));
      }, 3000);

      const onReady = () => {
        clearTimeout(timeout);
        video.removeEventListener('loadeddata', onReady);
        video.removeEventListener('canplay', onReady);
        video.removeEventListener('error', onError);
        resolve();
      };

      const onError = (e: Event) => {
        clearTimeout(timeout);
        video.removeEventListener('loadeddata', onReady);
        video.removeEventListener('canplay', onReady);
        video.removeEventListener('error', onError);
        reject(new Error('Video load error'));
      };

      video.addEventListener('loadeddata', onReady);
      video.addEventListener('canplay', onReady);
      video.addEventListener('error', onError);

      if (video.readyState === 0) {
        video.load();
      }
    });
  }

  onCardLeave(event: Event): void {
    this.floatingNameVisible = false;
    this.hoveredCardIndex = null;
    this.cleanup();

    const card = (event.target as Element).closest('.card');
    if (card) {
      const video = card.querySelector('video') as HTMLVideoElement;
      const img = card.querySelector('img') as HTMLImageElement;
      const loader = card.querySelector('.loading-spin') as HTMLElement;

      if (video && img) {
        console.log('Stopping card video playback');
        video.pause();
        video.currentTime = 0;
        video.style.opacity = '0';
        img.style.opacity = '1';

        if (loader) {
          loader.style.opacity = '0';
        }
      }
    }
  }

  onCardMouseMove(event: MouseEvent): void {
    const config = this.FLOATING_TAG_CONFIG;

    this.targetX = event.clientX + config.spacing;
    this.targetY = event.clientY;

    const maxX = window.innerWidth - config.width - config.margin;
    const maxY = window.innerHeight - config.height - config.margin;

    this.targetX = Math.min(this.targetX, maxX);
    this.targetY = Math.min(Math.max(this.targetY, config.margin), maxY);

    if (!this.animationId) {
      this.animateNameTag();
    }
  }

  private animateNameTag(): void {
    if (!this.floatingNameVisible) return;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const smoothFactor = this.FLOATING_TAG_CONFIG.smoothFactor;

    this.currentX = lerp(this.currentX, this.targetX, smoothFactor);
    this.currentY = lerp(this.currentY, this.targetY, smoothFactor);

    this.floatingNameStyle = {
      left: `${this.currentX}px`,
      top: `${this.currentY}px`
    };

    const threshold = 0.5;
    const shouldContinue = Math.abs(this.targetX - this.currentX) > threshold ||
                          Math.abs(this.targetY - this.currentY) > threshold;

    if (shouldContinue) {
      this.animationId = requestAnimationFrame(() => this.animateNameTag());
    } else {
      this.animationId = null;
    }
  }

  // ===== EVENT LISTENERS =====
  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.showModal) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.prevCard();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextCard();
        break;
      case ' ':
      case 'k':
        event.preventDefault();
        this.toggleVideoPlayPause();
        break;
      case 'm':
        event.preventDefault();
        this.toggleVideoMute();
        break;
    }
  }

  @HostListener('document:mouseleave')
  handleMouseLeave(): void {
    this.floatingNameVisible = false;
    this.cleanup();
  }

  @HostListener('window:resize')
  handleResize(): void {
    const isMobile = window.innerWidth <= 768;
    const floatingName = document.getElementById('floatingName');

    if (floatingName) {
      floatingName.style.display = isMobile ? 'none' : 'block';
    }

    // Hide floating name on mobile
    if (isMobile) {
      this.floatingNameVisible = false;
      this.cleanup();
    }
  }

  // ===== UTILITY METHODS =====
  trackByIndex(index: number, item: any): number {
    return index;
  }

  // Debug method to test video URLs
  testVideoUrl(url: string): void {
    const testVideo = document.createElement('video');
    testVideo.src = url;
    testVideo.onloadeddata = () => console.log('✅ Video URL works:', url);
    testVideo.onerror = () => console.error('❌ Video URL failed:', url);
  }

  // Test all video URLs (call this in ngOnInit if needed for debugging)
  testAllVideoUrls(): void {
    console.log('Testing all video URLs...');
    this.personalData.forEach((person, index) => {
      if (person.video) {
        console.log(`Testing ${person.name} video:`, person.video);
        this.testVideoUrl(person.video);
      } else {
        console.log(`No video URL for ${person.name}`);
      }
    });
  }

  // Legacy properties for backward compatibility
  get videoLoaded(): boolean {
    return this.modalVideoLoaded;
  }

  get videoError(): boolean {
    return this.modalVideoError;
  }

  // Legacy methods for backward compatibility
  onVideoLoaded(): void {
    this.onModalVideoLoaded();
  }

  onVideoError(event: Event): void {
    this.onModalVideoError(event);
  }

  onVideoCanPlay(): void {
    this.onModalVideoCanPlay();
  }
}
