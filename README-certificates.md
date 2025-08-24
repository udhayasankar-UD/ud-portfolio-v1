# Certificates Carousel Documentation

## Overview
The certificates carousel displays 6 professional certificates in an accessible, interactive carousel format with auto-scroll functionality, hover details, and modal views.

## Features
- **Auto-scroll**: Automatically advances every 4 seconds (respects `prefers-reduced-motion`)
- **Interactive Navigation**: Arrow buttons, pagination dots, and keyboard controls
- **Hover Details**: Shows certificate details on hover/focus
- **Modal View**: Click to open high-resolution certificate image
- **Touch Support**: Swipe gestures on mobile devices
- **Accessibility**: Full keyboard navigation, screen reader support, focus trap

## Certificate Management

### Adding/Updating Certificates
Edit the certificates array in `src/components/CertCarousel.tsx`:

```typescript
const certificates: Certificate[] = [
  { 
    id: 1, 
    title: "Certificate Title", 
    provider: "Issuing Organization", 
    desc: "Brief description of the certificate", 
    image: "/path/to/certificate-image.jpg", 
    alt: "Descriptive alt text for screen readers" 
  },
  // ... more certificates
];
```

### Image Requirements
- **Format**: JPG, PNG, or WebP
- **Resolution**: Minimum 800x600px for modal view
- **Aspect Ratio**: 4:3 or 16:9 recommended
- **File Size**: Optimize for web (< 500KB per image)
- **Location**: Place images in `public/` folder or import from `src/assets/`

### Image Naming Convention
Use descriptive names that match the certificate:
- `cert-network-fundamentals.jpg`
- `cert-aws-cloud-practitioner.jpg`
- `cert-python-basics.jpg`

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Arrow Keys**: Navigate between certificates
- **Enter/Space**: Open certificate modal
- **Escape**: Close modal

### Screen Reader Support
- Carousel has `role="region"` with appropriate labels
- Live region announces current certificate
- Modal has proper dialog semantics
- All images have descriptive alt text

### Reduced Motion
The carousel respects `prefers-reduced-motion: reduce`:
- Disables auto-scroll
- Reduces animation duration
- Maintains functionality

## Customization

### Auto-scroll Timing
Change the interval in `CertCarousel.tsx`:
```typescript
// Change 4000ms to desired milliseconds
setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % certificates.length);
}, 4000);
```

### Disable Auto-scroll
Set `isAutoPlaying` to `false` by default:
```typescript
const [isAutoPlaying, setIsAutoPlaying] = useState(false);
```

### Responsive Breakpoints
Modify the responsive display in the carousel container:
- Desktop: Shows 3 certificates (center emphasized)
- Tablet: Shows 2 certificates  
- Mobile: Shows 1 certificate

### Styling
The carousel uses existing design tokens:
- `bg-blue-glow`: Primary accent color
- `rgba(255,255,255,0.03)`: Glass card background
- Custom shadows and hover effects

## Performance Considerations

### Image Optimization
- Use `loading="lazy"` on images (already implemented)
- Consider using `next/image` or similar for automatic optimization
- Provide multiple image sizes with `srcset`

### Bundle Size
- Import only needed Lucide React icons
- Consider lazy loading the modal component
- Use CSS transforms for animations (already implemented)

## Troubleshooting

### Images Not Loading
1. Check image paths are correct
2. Ensure images exist in the specified location
3. Verify image file permissions
4. Check browser network tab for 404 errors

### Auto-scroll Not Working
1. Check `prefers-reduced-motion` setting
2. Verify component is properly mounted
3. Check for JavaScript errors in console
4. Ensure `shouldAnimate` state is true

### Modal Not Opening
1. Check if click handlers are properly bound
2. Verify modal component is imported correctly
3. Check for z-index conflicts
4. Ensure focus trap is working

## Browser Support
- **Modern browsers**: Full functionality
- **IE11**: Basic functionality (no advanced CSS features)
- **Mobile browsers**: Touch gestures supported
- **Screen readers**: Full accessibility support

## Future Enhancements
- Add certificate verification links
- Implement certificate categories/filtering  
- Add animation presets
- Support for video certificates
- Integration with credential APIs