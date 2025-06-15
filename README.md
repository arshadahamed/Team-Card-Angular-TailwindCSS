# 🌐 Angular Guide Cards

A modern, interactive Angular application featuring a card-based interface for showcasing travel guides with video introductions and detailed profiles.

Demo - https://team-card-angular-tailwind-css.vercel.app/

---

## 🌟 Features

### 🧩 Core Functionality
- 🎴 **Interactive Guide Cards** – Hover-responsive with image-to-video transitions
- 🖼️ **Modal Profile Viewer** – Full-screen modal with videos & details
- 🏷️ **Floating Name Tags** – Dynamic, mouse-tracking name display
- 🧭 **Navigation System** – Seamless guide-to-guide transitions
- 📱 **Responsive Design** – Optimized across all devices

### 🎥 Video Features
- 🔁 **Auto-play on Hover**
- 🎬 **Modal Video Player** with custom controls
- 🎛️ **Play/Pause, Mute/Unmute**
- 🧩 **Fallback Handling & Loading States**
- 🚀 **Performance Optimized**

### 🎮 Interactive Elements
- ⌨️ **Keyboard Navigation Support**
- 🌈 **Smooth CSS Animations**
- 🔄 **Loading Feedback**
- 🛡️ **Robust Error Handling**

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v16+)
- Angular CLI (v15+)
- npm or yarn

### ⚙️ Installation

```bash
git clone [<repository-url>](https://github.com/arshadahamed/Team-Card-Angular-TailwindCSS.git)
cd angular-guide-cards
npm install
ng serve

## 🎮 Usage Guide

### 🖱️ Interaction

- **Hover cards** → preview videos + name tag  
- **Click cards** → open full modal with info  
- **Use arrow keys** in modal to navigate  

---

### ⌨️ Modal Shortcuts

- `←/→` – Switch between guides  
- `Space` or `K` – Play or pause video  
- `M` – Mute/unmute  
- `Escape` – Close modal  

---

### 📱 Mobile

- Touch-friendly  
- Floating elements hidden for clarity  
- Performance-optimized for mobile limitations  

---

## 🛠️ Configuration

### ➕ Adding New Guides

Edit `personalData` in `app.component.ts`:

```ts
{
  name: 'Guide Name',
  img: 'path/to/image.jpg',
  video: 'path/to/video.mp4',
  tags: ['🌟 Tag1', '💼 Tag2'],
  subtitle: 'Guide Specialty',
  description: 'Guide details here...'
}

