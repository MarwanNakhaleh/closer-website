# Closer Brand System — iOS Implementation Guide
> For use by LLMs generating or editing Swift/SwiftUI code for the Closer iOS app

---

## Brand Identity

**App name:** Closer  
**Tagline:** Connect & Align  
**Platform:** iOS (SwiftUI primary)  
**Audience:** Committed couples in their 20s–40s  
**Tone:** Warm, intentional, modern. Research-backed, never clinical.

---

## Color System

### Swift Color Extension
```swift
import SwiftUI

extension Color {
    // Brand palette
    static let brandNavy      = Color(hex: "#102A43")  // Primary dark bg, nav
    static let brandNavyMid   = Color(hex: "#243B53")  // Gradient end, cards on dark
    static let brandTeal      = Color(hex: "#2BB3B1")  // Primary CTA, highlights
    static let brandTealDark  = Color(hex: "#239997")  // Pressed/active teal
    static let brandLavender  = Color(hex: "#B8C4E0")  // Secondary accent
    static let brandBg        = Color(hex: "#F4F7FA")  // Light screen background
    static let brandText      = Color(hex: "#102A43")  // Primary text on light
    static let brandTextSec   = Color(hex: "#486581")  // Secondary / caption text
    static let brandRingStart = Color(hex: "#8DBED1")  // Logo gradient start
}

// Hex initializer
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xFF) / 255
        let g = Double((int >> 8)  & 0xFF) / 255
        let b = Double(int         & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}
```

### Semantic Color Usage
| Token              | Light Mode    | Dark Mode     | Use                           |
|--------------------|---------------|---------------|-------------------------------|
| `brandNavy`        | `#102A43`     | `#102A43`     | Nav bar, tab bar              |
| `brandBg`          | `#F4F7FA`     | `#0d1e2e`     | Screen background             |
| `brandText`        | `#102A43`     | `#F4F7FA`     | Body text                     |
| `brandTextSec`     | `#486581`     | `#7aa0b8`     | Captions, subtitles           |
| `brandTeal`        | `#2BB3B1`     | `#2BB3B1`     | CTAs, active states           |
| `brandLavender`    | `#B8C4E0`     | `#B8C4E0`     | Secondary elements            |

---

## Typography

### Font Setup
The app uses **Inter** for all body/UI text and **DM Serif Display** for display headlines.

```swift
// Add Inter and DM Serif Display to your project via:
// 1. Download from Google Fonts
// 2. Add .ttf files to Xcode project
// 3. Register in Info.plist under "Fonts provided by application"

extension Font {
    // Display — DM Serif Display
    static let displayLarge  = Font.custom("DMSerifDisplay-Regular", size: 48)
    static let displayMedium = Font.custom("DMSerifDisplay-Regular", size: 36)
    static let displaySmall  = Font.custom("DMSerifDisplay-Regular", size: 28)

    // UI — Inter
    static let headingLarge  = Font.custom("Inter-SemiBold",  size: 24)
    static let headingMedium = Font.custom("Inter-SemiBold",  size: 20)
    static let headingSmall  = Font.custom("Inter-SemiBold",  size: 17)
    static let bodyLarge     = Font.custom("Inter-Regular",   size: 17)
    static let bodyMedium    = Font.custom("Inter-Regular",   size: 15)
    static let bodySmall     = Font.custom("Inter-Regular",   size: 13)
    static let label         = Font.custom("Inter-Medium",    size: 13)
    static let caption       = Font.custom("Inter-Regular",   size: 12)
    static let logoWordmark  = Font.custom("Inter-Light",     size: 22)
}
```

### Fallback (system fonts only)
```swift
// If custom fonts are unavailable, use these SF Pro equivalents:
static let headingLarge  = Font.system(size: 24, weight: .semibold, design: .default)
static let bodyLarge     = Font.system(size: 17, weight: .regular,  design: .default)
static let label         = Font.system(size: 13, weight: .medium,   design: .default)
```

---

## The Logo Mark in SwiftUI

```swift
import SwiftUI

struct CloserMark: View {
    var size: CGFloat = 44
    var bgColor: Color = .brandNavy

    private var scale: CGFloat { size / 44 }

    var body: some View {
        ZStack {
            // Secondary arc — lavender
            CloserArcPath(primary: false)
                .stroke(Color.brandLavender, lineWidth: 1.5 * scale)
                .opacity(0.55)

            // Primary arc — teal
            CloserArcPath(primary: true)
                .stroke(Color.brandTeal, lineWidth: 2.4 * scale)

            // Center gradient ring
            Circle()
                .fill(
                    LinearGradient(
                        gradient: Gradient(colors: [Color.brandRingStart, Color.brandLavender]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 7.2 * scale, height: 7.2 * scale)

            // Inner hole — matches background
            Circle()
                .fill(bgColor)
                .frame(width: 3.2 * scale, height: 3.2 * scale)
        }
        .frame(width: size, height: size)
    }
}

struct CloserArcPath: Shape {
    let primary: Bool  // true = teal arc, false = lavender arc

    func path(in rect: CGRect) -> Path {
        let s = rect.width / 44
        func p(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
            CGPoint(x: x * s, y: y * s)
        }

        var path = Path()
        if primary {
            // M4,38 C10,38 14,6 22,22 C30,38 34,6 40,6
            path.move(to: p(4, 38))
            path.addCurve(to: p(22, 22), control1: p(10, 38), control2: p(14, 6))
            path.addCurve(to: p(40, 6),  control1: p(30, 38), control2: p(34, 6))
        } else {
            // M4,6 C10,6 14,38 22,22 C30,6 34,38 40,38
            path.move(to: p(4, 6))
            path.addCurve(to: p(22, 22), control1: p(10, 6),  control2: p(14, 38))
            path.addCurve(to: p(40, 38), control1: p(30, 6),  control2: p(34, 38))
        }
        return path
    }
}

// Usage:
// CloserMark(size: 44, bgColor: .brandNavy)   // on dark background
// CloserMark(size: 44, bgColor: .brandBg)     // on light background
// CloserMark(size: 44, bgColor: .white)        // on white background
```

### Horizontal Wordmark
```swift
struct CloserWordmark: View {
    var size: CGFloat = 44
    var onDark: Bool = true

    var body: some View {
        HStack(spacing: 14) {
            CloserMark(size: size, bgColor: onDark ? .brandNavy : .brandBg)

            VStack(alignment: .leading, spacing: 3) {
                Text("Closer")
                    .font(.logoWordmark)
                    .foregroundColor(onDark ? .white : .brandNavy)
                    .kerning(3)

                Text("CONNECT & ALIGN")
                    .font(.caption)
                    .foregroundColor(.brandTextSec)
                    .kerning(2.5)
            }
        }
    }
}
```

---

## App Icon

### Icon Sizes Required (iOS)
| Size       | Usage                          |
|------------|--------------------------------|
| 1024×1024  | App Store submission           |
| 180×180    | iPhone @3x home screen         |
| 120×120    | iPhone @2x home screen         |
| 87×87      | iPhone Settings @3x            |
| 60×60      | iPhone @2x notification        |

> Use files from `png/closer-app-icon-{size}x{size}.png`  
> The navy gradient variant is the primary icon.  
> Add all sizes to `Assets.xcassets/AppIcon.appiconset/`

---

## Navigation Bar
```swift
// In your App or Scene delegate / root view
.navigationBarTitleDisplayMode(.inline)
.toolbarBackground(Color.brandNavy, for: .navigationBar)
.toolbarBackground(.visible, for: .navigationBar)
.toolbarColorScheme(.dark, for: .navigationBar)

// Navigation title style
// Use .inline with a custom CloserWordmark view for the root screen
// Use .inline with plain Inter SemiBold for inner screens
```

### Tab Bar
```swift
// UITabBar appearance (in @main App init)
let appearance = UITabBarAppearance()
appearance.configureWithOpaqueBackground()
appearance.backgroundColor = UIColor(Color.brandNavy)
appearance.stackedLayoutAppearance.normal.iconColor    = UIColor(Color.brandLavender.opacity(0.5))
appearance.stackedLayoutAppearance.normal.titleTextAttributes = [.foregroundColor: UIColor(Color.brandLavender.opacity(0.5))]
appearance.stackedLayoutAppearance.selected.iconColor  = UIColor(Color.brandTeal)
appearance.stackedLayoutAppearance.selected.titleTextAttributes = [.foregroundColor: UIColor(Color.brandTeal)]
UITabBar.appearance().standardAppearance = appearance
UITabBar.appearance().scrollEdgeAppearance = appearance
```

---

## UI Components

### Primary Button
```swift
struct PrimaryButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.label)
                .kerning(0.5)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 16)
                .background(Color.brandTeal)
                .cornerRadius(12)
        }
        .buttonStyle(ScaleButtonStyle())
    }
}

struct ScaleButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .animation(.easeOut(duration: 0.1), value: configuration.isPressed)
    }
}
```

### Secondary Button
```swift
struct SecondaryButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.label)
                .kerning(0.5)
                .foregroundColor(.brandTeal)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 15)
                .background(Color.brandTeal.opacity(0.08))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.brandTeal, lineWidth: 1.5)
                )
        }
        .buttonStyle(ScaleButtonStyle())
    }
}
```

### Card
```swift
struct BrandCard<Content: View>: View {
    let content: Content
    var dark: Bool = false

    init(dark: Bool = false, @ViewBuilder content: () -> Content) {
        self.dark = dark
        self.content = content()
    }

    var body: some View {
        content
            .padding(20)
            .background(dark ? Color.brandNavyMid : Color.white)
            .cornerRadius(16)
            .shadow(color: Color.brandNavy.opacity(dark ? 0 : 0.08), radius: 12, x: 0, y: 2)
    }
}
```

### Gradient Background
```swift
// Full-screen gradient background
var brandGradient: some LinearGradient {
    LinearGradient(
        gradient: Gradient(colors: [Color.brandTeal, Color.brandLavender]),
        startPoint: .bottomLeading,
        endPoint: .topTrailing
    )
}

// Dark screen background
var darkGradient: some LinearGradient {
    LinearGradient(
        gradient: Gradient(colors: [Color.brandNavy, Color.brandNavyMid]),
        startPoint: .top,
        endPoint: .bottom
    )
}
```

---

## Spacing & Layout

```swift
extension CGFloat {
    static let spaceXS:  CGFloat = 4
    static let spaceSM:  CGFloat = 8
    static let spaceMD:  CGFloat = 16
    static let spaceLG:  CGFloat = 24
    static let spaceXL:  CGFloat = 32
    static let space2XL: CGFloat = 48
    static let space3XL: CGFloat = 64
}

// Standard screen padding: .padding(.horizontal, .spaceMD) = 16
// Section spacing: .padding(.vertical, .spaceLG) = 24
// Card internal padding: 20
// Corner radii: small = 8, medium = 12, large = 16, pill = 999
```

---

## Animation Guidelines
- **Duration:** 0.2s for micro-interactions, 0.35s for screen transitions
- **Easing:** `.easeOut` for entrances, `.easeIn` for exits, `.spring(response:0.4, dampingFraction:0.7)` for bouncy elements
- **Scale presses:** 0.97 on press, 1.0 on release
- **Opacity transitions:** fade between 0.4 and 1.0, never fully invisible unless intentional

---

## Accessibility
- All teal-on-navy text must be at least 14px with weight 500 to meet WCAG AA
- Use `.accessibilityLabel()` on the CloserMark view: `"Closer logo"`
- Minimum tap target: 44×44pt
- Support Dynamic Type by using `.font()` with custom fonts and a fallback `.scaledFont` wrapper where possible

---

## File Assets Reference

| Asset                                      | Xcode location                                | Use                      |
|--------------------------------------------|-----------------------------------------------|--------------------------|
| `closer-app-icon-1024x1024.png`            | `AppIcon.appiconset/`                         | App Store & icon set     |
| `closer-app-icon-180x180.png`              | `AppIcon.appiconset/`                         | iPhone @3x               |
| `closer-app-icon-120x120.png`              | `AppIcon.appiconset/`                         | iPhone @2x               |
| `closer-mark-dark-176x176.png`             | `Assets.xcassets/LogoMark.imageset/`          | @2x mark on dark bg      |
| `closer-mark-dark-88x88.png`               | `Assets.xcassets/LogoMark.imageset/`          | @1x mark on dark bg      |
| `closer-mark-light-176x176.png`            | `Assets.xcassets/LogoMarkLight.imageset/`     | @2x mark on light bg     |
| `closer-wordmark-horizontal-dark-880x176.png` | `Assets.xcassets/Wordmark.imageset/`       | @2x full wordmark        |

> Prefer the **SwiftUI CloserMark view** over PNG assets wherever possible — it scales perfectly at any size and respects background color automatically.

---

*Last updated: March 2026 — Closer / Branson Solutions*
