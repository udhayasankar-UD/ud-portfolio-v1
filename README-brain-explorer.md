# Brain Skills Explorer

An interactive brain visualization that maps skills to different brain regions with drag-and-drop functionality.

## Components

### BrainExplorer
Main component that handles the interactive brain visualization and skill highlighting.

**Props:**
- `onSkillsHighlight`: Callback function when skills are highlighted
- `className`: Optional CSS classes

### Hotspot
Draggable circular hotspot with glow effects and particle trails.

**Props:**
- `position`: { x: number, y: number } - Position as percentage
- `isDragging`: boolean - Whether currently being dragged
- `color`: string - Hotspot color
- `glowColor`: string - Glow effect color
- `reducedMotion`: boolean - Whether to reduce animations

### RegionButtons
Keyboard-accessible region selection buttons.

**Props:**
- `regions`: Array of BrainRegion objects
- `selectedRegion`: Currently selected region
- `onRegionSelect`: Callback for region selection
- `className`: Optional CSS classes

### SkillDetailPanel
Detail panel showing selected region's skills and descriptions.

**Props:**
- `region`: BrainRegion or null - Currently selected region
- `className`: Optional CSS classes

## Configuration

### Region Centers
Edit region center coordinates in `BrainExplorer.tsx`:

```typescript
const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: 'design',
    center: { x: 25, y: 30 }, // Percentage coordinates
    // ... other properties
  }
];
```

### Proximity Threshold
Adjust proximity detection in the `findClosestRegion` function by modifying the distance calculation threshold.

### Animation Durations
Update animation durations in component CSS classes:
- Crossfade: `duration-200` (200ms)
- Hotspot transitions: `duration-300` (300ms)
- Chart highlighting: `duration-500` (500ms)

## Brain Images

The component uses three brain images located in `/lovable-uploads/`:
- **design.png**: Brain with pink-highlighted design region
- **development.png**: Brain with yellow-highlighted development region  
- **tools.png**: Brain with red/orange-highlighted tools region

### Updating Images
1. Replace images in the public folder
2. Update image paths in `BRAIN_REGIONS` array
3. Adjust region center coordinates if needed

## Skill Mappings

Skills are mapped to brain regions as follows:

### Design Region (Pink)
- HTML & CSS (70%)
- Blender (20%) 
- UI/UX Design (65%)

### Development Region (Yellow)
- JavaScript (40%)
- React (40%)
- Python (50%)
- GameDev (50%)

### Tools Region (Orange/Red)
- Cloud (10%)
- AI & ML (10%)
- Build Tools (35%)

### Adding New Skills
Update skill mappings in `BrainExplorer.tsx`:

```typescript
{
  id: 'new-region',
  skills: [
    { name: 'New Skill', value: 60, description: 'Description' }
  ]
}
```

## Accessibility Features

- **Keyboard Navigation**: Arrow keys cycle regions, Enter/Space selects
- **Screen Reader Support**: Announcements via aria-live regions
- **Touch Support**: Touch drag gestures for mobile devices
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Focus Management**: Proper focus indicators and tab order

## Performance Optimizations

- **Lazy Loading**: Brain images load when section enters viewport
- **RequestAnimationFrame**: Smooth dragging without jank
- **Debounced Updates**: Region detection optimized for performance
- **CSS Transforms**: Hardware-accelerated animations
- **Conditional Effects**: Particle trails disabled for reduced motion

## Browser Support

- Modern browsers with ES6+ support
- Touch devices (iOS Safari, Android Chrome)
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation

## Development

### Testing Interactions
1. **Mouse Drag**: Click and drag hotspot around brain
2. **Keyboard**: Use arrow keys and Enter to navigate
3. **Touch**: Touch and drag on mobile devices
4. **Screen Reader**: Verify announcements with reader enabled

### Performance Testing
Monitor frame rates during dragging:
```javascript
// In browser dev tools
performance.mark('drag-start');
// ... perform drag
performance.mark('drag-end');
performance.measure('drag-performance', 'drag-start', 'drag-end');
```

### Accessibility Testing
- Test with screen reader
- Verify keyboard navigation
- Check color contrast ratios
- Test with reduced motion enabled

## Troubleshooting

### Common Issues

**Hotspot not responding to drag:**
- Check event listeners are properly attached
- Verify pointer-events CSS not blocking interaction

**Images not loading:**
- Confirm image paths are correct
- Check network tab for 404 errors
- Verify images are in public folder

**Performance issues:**
- Enable `prefers-reduced-motion` 
- Reduce animation durations
- Check for memory leaks in event listeners

**Touch not working:**
- Ensure touch event handlers are bound
- Verify preventDefault() calls
- Check for iOS Safari specific issues
