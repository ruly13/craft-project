# React Code Generation Guidelines

**AI Agent Instructions for Generating React Code from Figma Design Screenshots**

These guidelines provide a structured approach for AI agents to generate high-quality, maintainable React code from Figma design screenshots. The focus is on adhering to design specifications, following React best practices, leveraging existing components, and ensuring code reusability and consistency.

## Role and Objectives

As a senior React developer AI agent, your primary objectives are to:

- **Translate Figma designs** into pixel-perfect, functional React components and pages.

- **Ensure code quality** by adhering to React best practices, maintaining consistency, and promoting reusability.

- **Follow provided guidelines** to produce clean, modular, and maintainable code that aligns with the project's architecture.

- **Automatically generate SWR service files** for any design containing dynamic data, following the mandatory Data-Driven Component Generation process.

- **Leverage existing components** whenever possible to maintain consistency and reduce development time.

## Core Principles

1. **Design Fidelity** – Treat Figma designs and exported CSS as the single source of truth for visual specifications.

2. **Reusability** – Prioritise existing components and create new ones only when necessary, ensuring modularity and consistency.

3. **Maintainability** – Write clean, readable code with clear separation of concerns and minimal redundancy.

4. **Best Practices** – Follow modern React conventions, including functional components, hooks, and appropriate state management.

5. **Data-Driven Architecture** – Generate SWR service files for any design containing dynamic data to keep data fetching separate from presentation.

## Table of Contents

1. [Quick Start Guide for AI Agents](#quick-start-guide-for-ai-agents)

2. [Component Development Guidelines](#component-development-guidelines)

3. [Core Principles](#core-principles)

4. [Component Selection & Usage](#component-selection-usage)

5. [Layout & Styling Guidelines](#layout-styling-guidelines)

6. [Form Implementation Patterns](#form-implementation-patterns)

7. [Available Components](#available-components)

8. [Internationalization (i18n)](#internationalization-i18n)

9. [Code Quality & Best Practices](#code-quality-best-practices)

---

## Quick Start Guide for AI Agents

<a id="quick-start-guide-for-ai-agents"></a>

### 🚨 Critical Safety Rules

1. **FORBIDDEN: Card Component** - Card component is BANNED. Always use primitives instead.

2. **MANDATORY: SWR Services** - Any design with dynamic data (lists, profiles, dashboards) requires immediate SWR service file generation.

3. **PROHIBITED: Template Strings** - NEVER use template strings for className construction. Always use `cn` helper.

4. **REQUIRED: Placeholders** - All images must use `https://picsum.photos/{width}?random={uniqueId}` immediately.

### Essential Workflow Checklist

**Step 1: Analyze Design**

- Identify dynamic data patte`rns → Generate SWR service if needed

- Look for zoomable images → Implement LightboxPreview

- Check for form inputs → Use React Hook Form + Valibot pattern

- Note any internationalization needs → Use useTranslation hook

**Step 2: Component Selection (3-Step Verification)**

1. **Functional Match**: Read `combined-descriptions.json` for component purpose

2. **Visual Test**: Open `ComponentName.stories.jsx` - compare with design

3. **API Check**: Verify props and imports match requirements

4. **Result**: Use ONLY if ALL THREE steps pass, otherwise fallback to primitives

**Step 3: Code Generation**

- Use functional components with hooks

- Follow Tailwind v3 utilities only (no invented variants)

- Implement proper error handling and loading states

- Apply semantic HTML and accessibility practices

**Step 4: Final Validation**

- No template strings in className

- All images have proper alt text and placeholder URLs

- Form validation uses Valibot with explicit error messages

- Component follows naming conventions and import patterns

### Immediate Action Items

- **IF** design contains lists/grids/profiles → **CREATE** SWR service file first

- **IF** component has visual mismatches → **USE** primitives instead

- **IF** form inputs present → **IMPLEMENT** React Hook Form + Valibot

- **IF** images needed → **USE** Picsum placeholders with unique random IDs

## Component Development Guidelines

<a id="component-development-guidelines"></a>

### Figma-First Approach

- **Adhere to Figma Specifications**: Implement layouts, sizes, colors, and typography exactly as specified in the Figma design and exported CSS

- **Pixel-Perfect Implementation**: Ensure the rendered UI matches the design down to the pixel, paying attention to spacing, alignment, and visual details

- **Tailwind CSS**: Use Tailwind CSS classes from `tailwind.config.mjs` for styling. Avoid inline styles or custom `.scss` files unless explicitly required

- **Automatic Service Generation**: **MANDATORY** - When the design contains dynamic data (lists, user profiles, dashboards, etc.), immediately generate a corresponding SWR service file before implementing the component, following the Data-Driven Component Generation guidelines

### Component Decomposition and Reusability

- **Identify Patterns**: Analyze the Figma design for repeating UI elements (e.g., cards, lists, buttons) and extract them into reusable components

- **Search Existing Components**: **Before creating a new component**, check the [Available Components](#available-components) section and the `src/components` directory for existing components that match the design

- **Modular Design**: Break down complex UIs into smaller, reusable components (atoms, molecules, organisms) with single responsibilities

### Component Co-location for Page-Specific Logic

When a complex page is broken down into smaller components (ProfileHeader, UserInfoCard, etc.) that are **not intended for reuse on other pages**, these components should be defined within the same file as the main page component (e.g., `src/app/your-page/page.js`).

This approach keeps page-specific logic co-located, simplifying file structure for single-page features. A component should only be extracted into its own file in `src/components/` if it is designed to be reused across multiple, unrelated pages.

#### Example Implementation:

**❌ BEFORE (Separate Files Approach):**

```jsx

import { ProfileHeader } from '@/components/company-profile/ProfileHeader';

import { CompanyInfoSection } from '@/components/company-profile/CompanyInfoSection';

// ...

// src/components/company-profile/ProfileHeader.js

export const ProfileHeader = ({ user }) => { /* ... */ };

```

**✅ AFTER (Co-located Approach):**

```jsx
"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";

// ... other imports

// Sub-component defined in the same file

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center space-x-4 p-6">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-16 w-16 rounded-full"
      />

      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>

        <p className="text-gray-600">{user.title}</p>
      </div>
    </div>
  );
};

// Main page component

const CompanyProfilePage = () => {
  const { data, isLoading, error } = useGetCompanyProfile();

  if (isLoading) return <LoadingStatic />;

  if (error) return <Alert variant="error">Failed to load profile</Alert>;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={data.user} />

      {/* Additional page-specific sections */}
    </div>
  );
};

export default CompanyProfilePage;
```

### Fallback to Primitives for Near Matches

If a component is functionally similar but not a 100% visual match, DO NOT force a fit. Forcing an existing component that violates the design's visual specifications (e.g., using BadgeStatus for a badge with no background) is a critical error.

The correct protocol is to "Fallback to Primitives":

- Construct the element from fundamental building blocks: div, span, IconComponent, etc.

- Apply Tailwind CSS classes directly to achieve a pixel-perfect match.

**Example**: The design shows a green "Verified" status with an icon but no background.

- ❌ **Incorrect**: Using `<BadgeStatus variant="success">` because it incorrectly adds a solid green background.

- ✅ **Correct**: Constructing it from primitives:

```jsx
<div className="flex items-center gap-1">
  <IconComponent src="/icons/verified-check.svg" className="size-4" />

  <span className="text-sm font-semibold text-success-400">Verified</span>
</div>
```

**Example:**

```jsx

// ✅ Good: Reusable ProductItem component

const ProductItem = ({product}) => (

  <div key={product.id} className="p-4 border rounded">

    <h3>{product.name}</h3>

    <p>{product.price}</p>

  </div>

)

const ProductList = ({ products }) => (

  <div className="grid grid-cols-3 gap-4">

    {products.map((product) => (

      <ProductItem key={product.id} product={product} />

    ))}

  </div>

);

// ❌ Bad: Repeated markup inline

const ProductList = ({ products }) => (

  <div className="grid grid-cols-3 gap-4">

    {products.map((product) => (

      <div key={product.id} className="p-4 border rounded">

        <h3>{product.name}</h3>

        <p>{product.price}</p>

      </div>

    ))}

  </div>

);

```

### Code Redundancy Elimination

- **Extract Repeated Logic**: Move complex or repeated logic into custom hooks (e.g., `useModalState`, `useFormValidation`)

- **Compose Components**: Build complex components by composing simpler ones to reduce duplication

- **Keep Components Focused**: Ensure each component has a single responsibility and minimal file size

### React Best Practices

- **Functional Components**: Use functional components with hooks (`useState`, `useEffect`, etc.) instead of class components

- **State Management**: Prefer `useState` for local state and lift state up to the nearest common ancestor when needed

- **Context API**: Use the Context API for shared state across components when prop drilling becomes cumbersome

- **Clean Code**: Write readable, well-documented code with consistent formatting (use Prettier and ESLint)

- **Error Handling**: Implement proper error boundaries and fallback UIs for robust applications

---

# AI Agent Instructions: SWR Data-Driven Component Generation

## Core Principles

<a id="core-principles"></a>

Generate React components for any dynamic data (lists, grids, profiles, dashboards, etc.) using this strict SWR service-layer pattern that separates data fetching from presentation.

---

## Mandatory Workflow

Every component with dynamic content must follow this 4-step pipeline:

1. **Create Service File**: Scaffold a dedicated SWR service file in `src/services/`

2. **Implement Hook**: Consume the SWR hook in your React component

3. **Handle States**: Manage loading, error, and success states in the UI

4. **Maintain Separation**: Keep all data logic in the service layer, presentation in components

---

## Service File Template

Use this exact template for all new service files. Replace `ResourceName` and customize all `// TODO` sections.

**File Location**: `src/services/getResourceName.js`

```javascript
import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

export const mockAPIResult = {
  data: {
    Message: { Code: 200, Text: "SUCCESS" },

    Data: {
      // TODO: Add realistic mock data here
    },

    Type: "resource-list",
  },
};

export const getResourceName = async (params) => {
  let response;

  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    // TODO: Replace with actual endpoint and method

    response = await fetcherMock.get("/api/resource-name", { params });
  }

  return response.data?.Data;
};

export const useGetResourceName = (params = {}) => {
  // TODO: Create a descriptive, unique key. Include params if the request is dynamic.

  const key = params
    ? `resource-name-${JSON.stringify(params)}`
    : "resource-name";

  const { data, error, isLoading, mutate } = useSWR(
    key,

    () => getResourceName(params),

    {
      // TODO: Add SWR options as needed

      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};
```

---

## Component Implementation Pattern

Consume the hook in your component and render based on the request state.

### ✅ Correct Implementation:

```jsx

import { useGetProducts } from "@/services/getProducts";

import { LoadingStatic } from "@muatmuat/ui/Loading";

import { Alert } from "@muatmuat/ui/Alert";



const ProductPage = () => {

  const { data, error, isLoading } = useGetProducts();



  if (isLoading) return <LoadingStatic />;

  if (error) return <Alert variant="error">Failed to load products.</Alert>;



  return (

    <div>

      {data?.items?.map((product) => (/** TODO: implement mapping here **/)}

    </div>

  );

};

```

### ❌ Incorrect Implementation (Prohibited):

```jsx

const ProductPage = () => {

  // NEVER mock data inline like this. It violates the core rules.

  const products = [

    { id: 1, name: "Product A" },

    { id: 2, name: "Product B" },

  ];

  return (<div>{products.map((product) => (/** TODO: implement mapping here */))}</div>

  );

};

```

---

## Advanced Patterns

### With Pagination

```javascript
// Service file with pagination

export const useGetProducts = (params) => {
  const key = `products-page-${JSON.stringify({ params })}`;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    getProducts({ page: params.page, limit: params.limit })
  );

  return { data, error, isLoading, mutate };
};
```

---

## Naming Conventions

- **Service File**: `getProducts.js` (verb + noun, no `use` prefix)

- **Fetcher Function**: `getProducts`

- **Hook**: `useGetProducts`

- **SWR Key**: A unique string, often kebab-case (e.g., `'product-list'`). Must be dynamic if the fetcher uses parameters.

---

## Best Practices Checklist

Before shipping any component that relies on dynamic data:

- ✅ Create a dedicated service file with proper structure

- ✅ Include realistic mock data that matches the expected API structure

- ✅ Handle loading and error states in the UI component

- ✅ Use descriptive, unique SWR keys for caching

- ✅ Keep all data logic in the service layer

- ✅ Ensure components remain presentation-only

- ✅ Follow naming conventions consistently

- ✅ Test with both mock and real data when possible

---

## Component Selection & Usage

<a id="component-selection-usage"></a>

### 🚨 CRITICAL SAFETY RULES

#### ❌ FORBIDDEN: Card Component - STRICTLY PROHIBITED

**Card component is BANNED** due to consistent misuse patterns. Always use primitives instead.

### 3-Step Component Selection Protocol (MANDATORY)

**NEVER skip these steps for ANY component:**

1. **Functional Match**: Read `combined-descriptions.json` → Does purpose match design?

2. **Visual Test**: Open `ComponentName.stories.jsx` → Compare with design (background, borders, shape, structure)

3. **API Check**: Review the related component code → Verify props and imports

**Result**: Use component ONLY if ALL THREE steps pass, otherwise use primitives.

### Component Reference Access

**AI Agents**: Find and read `combined-descriptions.json` in the current project:

- Search pattern: `combined-descriptions.json`

- Search scope: Entire current project/workspace

- Contains: Component purposes, critical rules, anti-patterns, usage constraints

**⚠️ CRITICAL**: This JSON file is the **ONLY source of truth** for component information.

### Quick Reference

**Status Indicators**: `BadgeStatus` (with background), primitives (without background), `TagBubble`, `NotificationCount`

**Forms & Inputs**: `Input`, `Select`, `Calendar`, `FilterDropdown`

**Modals & Overlays**: `Modal`, `ConfirmationModal`, `BottomSheet`, `InfoTooltip`

### Modal System Implementation

**Architecture**: Compound component pattern with context-managed state.

**Components**: `Modal` (root), `ModalTrigger` (wrapper), `ModalContent` (container), `ModalHeader` (decorative), `ModalTitle` (semantic), `ModalFooter`, `ModalClose`.

| Component | Purpose | Key Props | Constraints |

| :------------- | :--------------------------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------ |

| `Modal` | Root wrapper that manages visibility and context | `open`, `onOpenChange`, `withCloseButton` | Use `open`/`onOpenChange` for controlled mode. `withCloseButton` controls the default corner 'X'. |

| `ModalTrigger` | Wraps the interactive element that toggles the modal | `asChild` | Must be a direct child of `Modal`. |

| `ModalContent` | Structural container for all modal content | `className`, `type` | The main container for your modal's UI. |

| `ModalHeader` | Optional decorative header with branding | `variant` | Self-closing; only use when the design shows a branded header image. |

| `ModalTitle` | Semantic heading renderer for modal titles | `className`, `withClose` | Use `withClose` for inline close buttons. |

### Implementation Strategy

Follow this decision tree when implementing a modal from a Figma design:

1.  **Standard Match**: If the design matches the default modal behavior (e.g., a close button in the top-right corner), use the component as-is. Set `withCloseButton={true}` (or omit, as it's the default).

2.  **Near Match (Adaptation Required)**: If the design is structurally a modal but has minor visual differences, **do not fall back to primitives**. Instead, adapt the component with a non-breaking change.

    > **Example Scenario**: The Figma design requires an inline close button next to the title, not in the corner.

    > - **Step A: Disable Default Behavior**: Set `withCloseButton={false}` on the root `<Modal>` component to remove the corner 'X' button.

    > - **Step B: Propose an Adaptation**: State the need for an adaptation: "The design requires an inline close button. I will add a `withClose: boolean` prop to the `ModalTitle` component to support this layout."

    > - **Step C: Generate Updated Code**: Provide the full, updated code for the `Modal.jsx` file, incorporating the new prop and its conditional logic within `ModalTitle`.

    > - **Step D: Generate Final Usage Example**: Use the newly adapted component to perfectly match the design.

**Implementation Details**:

- **Header with background-image**: Use `<ModalHeader />` and apply direct width classes to `<ModalContent>`.

- **Header without background**: Omit `<ModalHeader />`.

- **Close Button Logic**: The default corner 'X' is controlled by `withCloseButton` on `<Modal>`. The inline 'X' is controlled by `withClose` on `<ModalTitle>`. **You must disable one to use the other.**

#### Example: Standard Modal

```jsx
import { Button } from "@muatmuat/ui/Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

const StandardModal = () => (
  <Modal>
    <ModalTrigger asChild>
      <Button>Open Standard Modal</Button>
    </ModalTrigger>

    <ModalContent className="w-[458px]">
      <ModalHeader />

      <ModalTitle className="px-4 pt-6">Standard Modal Title</ModalTitle>

      <div className="p-6">Modal content goes here...</div>
    </ModalContent>
  </Modal>
);
```

#### Example: Adapted Modal for Inline Close Button

```jsx

import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";

import { Modal, ModalContent, ModalTitle, ModalTrigger } from "@muatmuat/ui/Modal";



const WarningModalExample = ({...}) => {

  ...

  return (

    <Modal open={isOpen} onOpenChange={setIsOpen} withCloseButton={false}>

      <ModalContent

        type="muatmuat"

        className="w-[411px] rounded-xl bg-white p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]"

      >

        <div className="flex flex-col items-center justify-center gap-6 px-6 py-9">

          <ModalTitle withClose>Warning</ModalTitle>

          ...

        </div>

      </ModalContent>

    </Modal>

  );

};

```

### Specialized Components

**Maps**: Use `MapContainer` for location selection, coordinate display, interactive markers

**Lightbox**: Implement for zoomable images with `LightboxProvider` + `LightboxPreview`

**Scrollable Areas**: Apply `max-h-[...]` + `overflow-y-auto` + `min-h-0` for flex containers

### Common Mistakes to Avoid

- **Import Errors**: Check `index.js` for correct exports

- **Props Hallucination**: Verify actual props in the component code, don't invent them

- **Visual Mismatches**: If ANY visual difference exists, use primitives

## Layout & Styling Guidelines

<a id="layout-styling-guidelines"></a>

### Core Layout Patterns

#### Scrollable Flex Containers

**Pattern**: Apply this trio for scrollable regions inside flex columns:

1. `max-h-[...]` or `h-[...]` — establishes vertical boundary

2. `overflow-y-auto` — enables scrolling when content exceeds boundary

3. `min-h-0` — allows element to shrink and respect boundary

**Example**:

```jsx
// ✅ Correct scrollable flex container

<div className="flex h-[400px] flex-col border">
  <div className="flex-shrink-0 border-b p-4">Fixed Header</div>

  <div className="max-h-full min-h-0 overflow-y-auto">
    <div className="space-y-3 p-4">...very long content...</div>
  </div>

  <div className="flex-shrink-0 border-t p-4">Fixed Footer</div>
</div>
```

**Key Reminders**:

- Use `flex-shrink-0` on headers/footers to prevent shrinking

- Apply to every scrollable flex child

- Consider pagination/virtualization for very large lists (≈1000+ items)

### TailwindCSS Usage Guidelines

- Use official Tailwind v3 utilities only (no invented variants)

- Group utilities logically: layout → spacing → color → typography → state

- Arbitrary values allowed for custom Figma metrics (`h-[312px]`)

- Use `cn` helper for conditional class composition

#### Grid vs Flexbox Decision

**Core Principle**:

- **Flexbox** for 1D layouts (single row OR single column)

- **Grid** for 2D layouts (rows AND columns simultaneously)

**Grid Crossover Rule**: Use Grid over Flexbox when design specifies explicit, distinct widths for direct children.

**Example**:

```jsx
// ✅ Preferred (Grid) for explicit widths

<div className="grid grid-cols-[250px_456px_1fr] items-center gap-[72px]">
  <div>{/* Logo */}</div>

  <div>{/* Title */}</div>

  <div className="flex justify-end">{/* Buttons */}</div>
</div>
```

### Color System

Use configured palettes exactly as defined in the Tailwind preset so branding stays consistent.

| Token | Description | Range |

| ---------------------- | ----------------------------------------- | --------------------- |

| `neutral` | Greys for surfaces, borders, typography | `#ffffff` → `#000000` |

| `success` | Positive / confirmation states (greens) | `#e3f5ed` → `#005d31` |

| `warning` | Alerts / caution banners (amber → orange) | `#fffde6` → `#fe700d` |

| `error` | Destructive / error states (reds) | `#ffe9ed` → `#b5000b` |

| `primary` | Core Muat blue brand | `#e2f2ff` → `#0c377c` |

| `secondary` | Secondary yellow–orange accent | `#fff8e1` → `#fe700d` |

| `buyer-seller` | Buyer/Seller ecosystem blue | `#e8ebf7` → `#176cf7` |

| `muat-parts-member` | MuatParts member maroon | `#f6e6e8` → `#770000` |

| `muat-parts-non` | MuatParts non-member orange-red | `#ffeaec` → `#b31b06` |

| `muat-trans` | MuatTrans neutral slate | `#f8f8f0` → `#770000` |

| `muat-trans-primary` | MuatTrans primary yellow | `#fffbeb` → `#7a360d` |

| `muat-trans-secondary` | MuatTrans secondary brown | `#ede8e6` → `#461b02` |

**Guidelines**:

- **Base tones**: Use `500` for base elements

- **Backgrounds**: Lighter tones (`50`–`200`)

- **Text/borders**: Darker tones (`600`+)

- **Brand families**: Reserve `muat-*`, `buyer-seller` for respective products

### Specialized Components

#### Lightbox Implementation

**Activation**: Zoom icons, hover overlays, product/media images, multi-image galleries

**Standard Usage Pattern**:

```jsx
<LightboxProvider
  image="https://picsum.photos/400?random=1"
  title="Reference Photo"
>
  <LightboxPreview
    image="https://picsum.photos/400?random=1"
    alt="Reference Photo"
    className="h-[72px] w-[72px] cursor-zoom-in rounded object-cover"
  />
</LightboxProvider>
```

**Galleries and Multi-Image Sets**:

```jsx
const images = [
  { id: 1, title: "Front View", url: "https://picsum.photos/600?random=1" },

  { id: 2, title: "Rear View", url: "https://picsum.photos/600?random=2" },

  { id: 3, title: "Interior", url: "https://picsum.photos/600?random=3" },
];

<LightboxProvider images={images.map((image) => image.url)} title="Gallery">
  <div className="grid grid-cols-3 gap-3">
    {images.map((image, index) => (
      <LightboxPreview
        key={image.id}
        image={image.url}
        index={index}
        alt={image.title}
        className="h-24 w-full cursor-zoom-in rounded object-cover"
      />
    ))}
  </div>
</LightboxProvider>;
```

### Accessibility and Interaction Requirements

**Accessibility Compliance**:

- Provide meaningful `alt` text for every `LightboxPreview`

- Verify keyboard support: Enter/Space opens the lightbox; Escape closes; Arrow keys navigate multi-image sets

- Ensure focus trapping behaves as expected—test with both mouse and keyboard navigation

**Quality Requirements**:

- Supply high-resolution assets (≥2× the display dimensions) to avoid pixelation

- Respect layout spacing with Tailwind utilities (`h-*`, `w-*`, `object-cover`)

- Use responsive classes when thumbnails must adapt to different breakpoints

- Maintain consistent aspect ratios between thumbnails and full-size images

**Pre-Ship Checklist**:

- ✅ All placeholders point to `https://picsum.photos/...` with unique `?random` parameters

- ✅ `LightboxProvider` / `LightboxPreview` wrap every image flagged for zoom

- ✅ Keyboard and screen-reader interactions verified

- ✅ Any associated captions or metadata appear alongside the enlarged view when required by the design

#### Map Implementation

**Use Cases**: Location selection, coordinate display, interactive markers, store locators

**Example**:

```jsx
import { MapContainer } from "@muatmuat/ui/MapContainer";

const LocationPicker = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: -6.2088, // Jakarta

    longitude: 106.8456,
  });

  return (
    <MapContainer
      coordinates={coordinates}
      className="h-[300px] w-full rounded-lg border"
      onPositionChange={setCoordinates}
      textLabel="Selected Location"
      draggableMarker={true}
    />
  );
};
```

### Common Styling Pitfalls

**🚫 PROHIBITED**: Template strings for className construction

**✅ REQUIRED**: Always use `cn` helper for conditional classes

**Other pitfalls to avoid**:

- Mixing string concatenation with `cn`

- Leaving conflicting utilities (`px-4` and `px-6`)

- Copying raw Figma token names that don't exist in preset

- Skipping responsive classes in design specs

## Form Implementation Patterns

<a id="form-implementation-patterns"></a>

### Activation Checklist

**Use React Hook Form + Valibot when**:

- UI contains at least one input element (`<input>`, `<textarea>`, `<select>`, file upload)

- UI exposes a primary submission pathway (typically `<button type="submit">`)

**Skip when**:

- Single uncontrolled input (search bars, filtering chips) that reacts immediately

- Validation is unnecessary beyond simple presence checks

### Base Setup

```jsx
import React from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Input, Select, TextArea } from "@muatmuat/ui/Form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";
```

### Implementation Workflow

#### Step 1: Define Schema & Types

```jsx
/**

 * @typedef {Object} ContactFormData

 * @property {string} name

 * @property {string} email

 * @property {string} message

 */

const contactSchema = v.object({
  name: v.pipe(
    v.string("ContactForm.validation.nameRequired"),

    v.nonEmpty("ContactForm.validation.nameRequired")
  ),

  email: v.pipe(
    v.string("ContactForm.validation.emailRequired"),

    v.nonEmpty("ContactForm.validation.emailRequired"),

    v.email("ContactForm.validation.emailInvalid")
  ),
});
```

**Critical**: Add explicit messages to ALL validation rules. `v.string()` validates against `null/undefined`, while `v.nonEmpty()` validates against empty strings - both need the same message.

#### Step 2: Build Component

```jsx
const ContactForm = () => {
  const {
    register,

    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: valibotResolver(contactSchema),

    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Contact form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
};
```

### Advanced Patterns

#### Cross-field Validation (`v.check`)

```jsx
const registrationSchema = v.pipe(
  v.object({
    password: v.pipe(
      v.string("Register.validation.passwordRequired"),

      v.minLength(8, "Register.validation.passwordTooShort")
    ),

    confirmPassword: v.pipe(
      v.string("Register.validation.confirmPasswordRequired"),

      v.nonEmpty("Register.validation.confirmPasswordRequired")
    ),
  }),

  v.check(
    ({ password, confirmPassword }) => password === confirmPassword,

    "Register.validation.passwordMismatch"
  )
);
```

#### Dynamic Arrays with `useFieldArray`

```jsx
const projectSchema = v.object({
  projectName: v.pipe(
    v.string("ProjectForm.validation.projectNameRequired"),

    v.nonEmpty("ProjectForm.validation.projectNameRequired")
  ),

  teamMembers: v.array(
    v.object({
      name: v.pipe(
        v.string("ProjectForm.validation.memberNameRequired"),

        v.nonEmpty("ProjectForm.validation.memberNameRequired")
      ),

      email: v.pipe(
        v.string("ProjectForm.validation.memberEmailRequired"),

        v.email("ProjectForm.validation.memberEmailInvalid")
      ),
    })
  ),
});

const ProjectForm = () => {
  const { control, register, handleSubmit } = useForm({
    resolver: valibotResolver(projectSchema),

    defaultValues: { teamMembers: [{ name: "", email: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,

    name: "teamMembers",
  });

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3">
          <Input
            placeholder="Member name"
            {...register(`teamMembers.${index}.name`)}
          />

          <Input
            placeholder="Member email"
            {...register(`teamMembers.${index}.email`)}
          />

          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}

      <Button onClick={() => append({ name: "", email: "" })}>
        Add member
      </Button>

      <Button type="submit">Create project</Button>
    </form>
  );
};
```

#### Conditional Validation with `v.variant`

Use discriminated unions when one field controls whether others are required:

```jsx
const uploadProofSchema = v.variant("isOverload", [
  v.object({
    isOverload: v.literal(false),

    proofOfLoading: v.pipe(
      v.array(v.instance(File)),

      v.minLength(1, "UploadProof.validation.proofRequired")
    ),
  }),

  v.object({
    isOverload: v.literal(true),

    proofOfLoading: v.pipe(
      v.array(v.instance(File)),

      v.minLength(1, "UploadProof.validation.proofRequired")
    ),

    additionalCostAgreement: v.pipe(
      v.number("UploadProof.validation.additionalCostRequired"),

      v.minValue(1, "UploadProof.validation.additionalCostRequired")
    ),
  }),
]);
```

### Handling Form-Level Errors with `onError` Callback

Use `onError` for form-wide validation failures (e.g., showing a toast for completely empty form submission):

```jsx
const followUpSchema = v.object({
  followUpResult: v.pipe(
    v.string("FollowUpForm.validation.followUpResultRequired"),

    v.nonEmpty("FollowUpForm.validation.followUpResultRequired")
  ),

  nextFollowUpEstimate: v.pipe(
    v.string("FollowUpForm.validation.nextFollowUpEstimateRequired"),

    v.nonEmpty("FollowUpForm.validation.nextFollowUpEstimateRequired")
  ),

  changeStatus: v.pipe(
    v.string("FollowUpForm.validation.changeStatusRequired"),

    v.nonEmpty("FollowUpForm.validation.changeStatusRequired")
  ),
});

const FollowUpForm = ({ onSubmit: handleSuccessSubmit }) => {
  const {
    handleSubmit,

    formState: { isSubmitting },
  } = useForm({
    resolver: valibotResolver(followUpSchema),

    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    // Handle successful form submission

    await handleSuccessSubmit(data);
  };

  const onError = (errors) => {
    if (
      errors.followUpResult &&
      errors.nextFollowUpEstimate &&
      errors.changeStatus
    ) {
      toast.error("All fields are required.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Form fields */}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
```

### Internationalisation (i18n) Integration

Replace literal error strings with translation keys and translate them in components:

```jsx
import { useTranslation } from "@/hooks/use-translation";

const LoginForm = () => {
  const { t } = useTranslation();

  const {
    register,

    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: valibotResolver(loginSchema),

    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Login form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label={t("LoginForm.label.email", {}, "Email")}
        placeholder={t("LoginForm.placeholder.email", {}, "Enter your email")}
        error={t(errors.email?.message ?? "", {}, errors.email?.message ?? "")}
        {...register("email")}
      />

      <Input
        type="password"
        label={t("LoginForm.label.password", {}, "Password")}
        placeholder={t(
          "LoginForm.placeholder.password",

          {},

          "Enter your password"
        )}
        error={t(
          errors.password?.message ?? "",

          {},

          errors.password?.message ?? ""
        )}
        {...register("password")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t("LoginForm.button.signingIn", {}, "Signing in…")
          : t("LoginForm.button.submit", {}, "Sign in")}
      </Button>
    </form>
  );
};
```

**Important**: Update locale JSON files with new keys: `public/mock-common-id.json`, `public/mock-common-en.json`, and `public/mock-common-cn.json`.

### Final Checklist

**Before shipping any form implementation:**

- ✅ **Activation conditions met** (true form submission flow vs uncontrolled inputs)

- ✅ **Schema mirrors the payload**; all validation rules live in Valibot

- ✅ **ALL validation rules have explicit messages** (no Valibot defaults)

- ✅ **`useForm` initialized** with `valibotResolver` and appropriate mode

- ✅ **UI pulls validation messages** from `errors.{field}.message` (translated when necessary)

- ✅ **Conditional rules use `v.variant`**; cross-field logic uses `v.check`

- ✅ **`useFieldArray` handles repeatable groups** when schema expects arrays

- ✅ **`onError` callback implemented** for form-level validation side-effects

- ✅ **Locale JSON files include** every new translation key

- ✅ **Type safety maintained** with proper TypeScript types or JSDoc annotations

- ✅ **Loading states handled** for form submission (`isSubmitting`)

- ✅ **Error boundaries considered** for robust error handling

- ✅ **Form reset implemented** where appropriate (after successful submission)

- ✅ **Accessibility standards met** for form controls and error messages

## Available Components

<a id="available-components"></a>

### 🚨 CRITICAL SAFETY RULES (READ FIRST)

#### ❌ FORBIDDEN: Card Component - STRICTLY PROHIBITED

**Card component is BANNED due to consistent misuse patterns.**

**Always use primitives instead:**

```jsx
// ✅ CORRECT - Using primitives for card layouts

<div className="rounded-lg border border-neutral-100 bg-white p-4 shadow-sm">
  <div className="mb-3 flex items-center justify-between">
    <h3 className="text-base font-semibold text-neutral-900">Card Title</h3>
  </div>

  <div className="text-sm text-neutral-600">Card content goes here</div>
</div>
```

---

## 🤖 COMPONENT SELECTION ALGORITHM FOR AI AGENTS

### Step 1: Quick Category Scan

```

Need: [Describe UI element]

↓

Jump to relevant category below

↓

Identify candidate components

```

### Step 2: 3-Step Verification Protocol (MANDATORY)

**NEVER skip these steps for ANY component:**

#### ✅ Step 1: Functional Match Analysis

- Read component description

- Does its purpose match the design element?

#### ✅ Step 2: Visual Fidelity Litmus Test (CRITICAL)

- Open `ComponentName.stories.jsx`

- Compare visually against Figma design:
  - Background: Has color/gradient where design doesn't?

  - Borders: Has borders where design doesn't?

  - Shape: Rounded when design is sharp (or vice versa)?

  - Structure: Composite when design is simple?

- **If ANY visual mismatch → NOT VALID → Use primitives**

#### ✅ Step 3: Prop and API Verification

- Always check component code so you know what props or how to implement the component better

- Check `index.js` for correct imports

- Confirm available props match requirements

**Result: Component approved ONLY if ALL THREE steps pass**

### Step 3: Fallback to Primitives

If component fails visual test → Build from primitives:

```jsx
// Example: Status text with icon, no background

<div className="flex items-center gap-1">
  <IconComponent src="/icons/verified-check.svg" className="size-4" />

  <span className="text-sm font-semibold text-success-400">Verified</span>
</div>
```

---

## 📂 COMPONENT REFERENCE

### 🔍 How to Access Component Descriptions

**AI Agents: Read the component descriptions from the external JSON file:**

1. **Locate the file**: Find `combined-descriptions.json` in the current project

2. **Search strategy**: Use file search tools to locate the JSON file:

   ```

   Search pattern: combined-descriptions.json

   Search scope: Entire current project/workspace

   ```

3. **Read the JSON**: The file contains all component descriptions with:
   - Component purpose and functionality

   - Critical rules and anti-patterns

   - Usage constraints and requirements

### 📋 Component Selection Process

**When you need to find components:**

1. **Read the JSON file first** to understand available options

2. **Search for relevant keywords** matching your UI element needs

3. **Extract component descriptions** for potential matches

4. **Follow the 3-Step Verification Protocol** (see algorithm above)

5. **Check critical rules** in the descriptions before implementation

**⚠️ CRITICAL**: The `combined-descriptions.json` file is the **ONLY source of truth** for component information. Never rely on memory or external knowledge about components - always read the latest JSON file for accurate descriptions, rules, and constraints.

---

## ⚡ QUICK REFERENCE GUIDE

### Most Common Component Selections

#### Status Indicators

- **Badge with background**: `BadgeStatus`

- **Status text without background**: Use primitives with `IconComponent` + `span`

- **Filter tags**: `TagBubble`

- **Notification count**: `NotificationCount`

#### Forms & Inputs

- **Standard text input**: `Input`

- **Dropdown selection**: `Select`

- **Date selection**: `Calendar`

- **Multi-select filtering**: `FilterDropdown`

#### Modals & Overlays

- **General modal**: `Modal`

- **Confirmations**: `ConfirmationModal`

- **Mobile bottom sheet**: `BottomSheet`

- **Information display**: `InfoTooltip`

---

## 🚫 COMMON MISTAKES TO AVOID

### ❌ Import Errors

```jsx
// WRONG - Assuming component exists
import { Badge } from "@muatmuat/ui/Badge";
// Badge doesn't exist!

// CORRECT - Check index.js first

import { BadgeStatus, TagBubble } from "@muatmuat/ui/Badge";
```

### ❌ Props Hallucination

```jsx

// WRONG - Making up props

<IconComponent name="icon-edit" className="size-4" /> // No 'name' prop!



// CORRECT - Check the component code for actual props

<IconComponent src="/icons/icon-edit.svg" size="small" color="primary" />

```

### ✅ Correct Research Process Example

1. **Need**: Status badge → Check Badge components

2. **Verify**: `src/components/Badge/index.js` → Exports: `BadgeStatus`, `TagBubble`

3. **Validate**: Read `Badge.stories.jsx` → Check usage patterns

4. **Implement**: `<BadgeStatus variant="success">Completed</BadgeStatus>`

---

## Internationalization (i18n)

<a id="internationalization-i18n"></a>

### Overview

Systematic approach for implementing internationalization in React components by identifying hardcoded strings, creating translation keys, and generating multilingual content for Indonesian (ID), English (EN), and Chinese (ZH) languages.

### Implementation Process

#### Phase 1: String Analysis

Identify all user-facing hardcoded strings in:

- **JSX Text Nodes**: Text between JSX tags

- **Component Props**: title, label, placeholder, etc.

- **JavaScript Logic**: Error messages, alerts, notifications

- **Special Components**: InfoBottomsheet and InfoTooltip with HTML content

#### Phase 2: Translation Key Generation

Create unique keys following this pattern: `ComponentName.context.section.description`

**Key Naming Patterns**:

- Error Messages: `ComponentName.message.error.contextDescription`

- Form Labels: `ComponentName.label.componentField`

- Button Text: `ComponentName.button.actionContext`

- Navigation: `ComponentName.nav.sectionItem` or `ComponentName.tab.sectionName`

- Titles: `ComponentName.title.pageSection`

- InfoBottomsheet: `ComponentName.infoBottomsheet.componentContent`

- InfoTooltip: `ComponentName.infoTooltip.componentContent`

#### Phase 3: Dynamic Value Handling

Replace dynamic values with descriptive placeholders:

- Original: "Kebutuhan 3 Unit" → Processed: "Kebutuhan {number} Unit"

- Original: "Menampilkan 5 dari 20 item" → Processed: "Menampilkan {current} dari {total} item"

#### Phase 4: Component Implementation

1. Import the translation hook:

   ```jsx
   import { useTranslation } from "@/hooks/use-translation";
   ```

2. Instantiate in the component:

   ```jsx
   const { t } = useTranslation();
   ```

3. Replace all user-facing strings with t() calls, providing parameters and fallback:

   ```jsx
   {
     // Basic usage without parameters

     t("ComponentName.uniqueLabel", {}, "Original Fallback Text");

     // With parameters for string replacement

     t("ComponentName.label.weight", { weight: 100 }, `Berat ${weight}kg`);
   }
   ```

4. **Strict Implementation**: You must import useTranslation from `@/hooks/use-translation` and use it directly. Do not generate a mock useTranslation hook inside the page component file for demonstration. Assume the hook is fully integrated.

#### Phase 5: Special Component Handling

**InfoBottomsheet Components**:

1. Minify HTML content to single line

2. Create translation key with `infoBottomsheet` prefix

3. Translate while preserving HTML tags

4. Use render prop for implementation:

```jsx
import { InfoBottomsheet } from "@muatmuat/ui/InfoBottomsheet";

import { useTranslation } from "@/hooks/use-translation";

<InfoBottomsheet
  title={t("ComponentName.title.cargoTypeDimensions", {}, "Tipe Muatan")}
  render={t(
    "ComponentName.infoBottomsheet.cargoTypeDimensions",

    {},

    "<ul><li><b>Panjang:</b> Ukuran terpanjang</li></ul>"
  )}
/>;
```

**InfoTooltip Components**:

Follow same pattern as InfoBottomsheet but use `infoTooltip` prefix:

```jsx
import { InfoTooltip } from "@muatmuat/ui/InfoTooltip";

import { useTranslation } from "@/hooks/use-translation";

<InfoTooltip
  className="w-[336px]"
  side="right"
  render={t(
    "ComponentName.infoTooltip.halalLogistics",

    {},

    "<p>Centang opsi ini jika pengiriman memerlukan...</p>"
  )}
/>;
```

#### Phase 6: Output Generation

When a component using useTranslation is generated, you must also generate the following three mock JSON files as separate files:

1. `public/mock-common-id.json` (Indonesian)

2. `public/mock-common-en.json` (English)

3. `public/mock-common-cn.json` (Chinese)

These files will contain all translation keys identified in Phase 2, with their respective translations.

**Example File Generation**:

`public/mock-common-id.json`:

```json
{
  "CompanyProfilePage.label.email": "Email",

  "CompanyProfilePage.badge.verified": "Terverifikasi"
}
```

`public/mock-common-en.json`:

```json
{
  "CompanyProfilePage.label.email": "Email",

  "CompanyProfilePage.badge.verified": "Verified"
}
```

`public/mock-common-cn.json`:

```json
{
  "CompanyProfilePage.label.email": "邮箱",

  "CompanyProfilePage.badge.verified": "已验证"
}
```

### Complete Example

**Before**:

```jsx
import { Tabs } from "@muatmuat/ui/Tabs";
import { TabsTrigger } from "@muatmuat/ui/Tabs";

<Tabs>
  <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
</Tabs>;
```

**After**:

```jsx
import { cn } from "@muatmuat/lib/utils";
import { Tabs } from "@muatmuat/ui/Tabs";
import { TabsTrigger } from "@muatmuat/ui/Tabs";

import { useTranslation } from "@/hooks/use-translation";

const Component = () => {
  const { t } = useTranslation();

  const weightValue = 100;

  return (
    <div>
      <Tabs>
        <TabsTrigger value="ringkasan">
          {t("DetailPesananScreen.tab.ringkasan", {}, "Ringkasan")}
        </TabsTrigger>
      </Tabs>

      {/* Example with parameter */}

      <div>
        {t(
          "ComponentName.label.weight",

          { weight: weightValue },

          `Berat ${weightValue}kg`
        )}
      </div>
    </div>
  );
};

export default Component;
```

The three JSON files will be automatically generated with all translation keys as shown in Phase 6 examples above.

## Code Quality & Best Practices

<a id="code-quality-best-practices"></a>

### File & Component Structure

**Component Organization**:

- Use functional components with hooks; export main component as default export

- Import order: React → third-party libraries → project-level modules → local files

- Co-locate page-specific subcomponents; extract only reusable primitives to `src/components`

- Keep helpers/utilities as named exports for tree-shaking

**Example**:

```jsx
import React, { useEffect, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";

import { useTranslation } from "@/hooks/use-translation";

const ExampleCard = ({ title }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-neutral-900">{t(title)}</h2>

      <Button className="mt-4">{t("actions.save", {}, "Save")}</Button>
    </section>
  );
};

export default ExampleCard;
```

### Naming Conventions

| Item | Style | Example |

| ----------------- | ------------------------------------------------- | ----------------------------------------------- |

| Components | PascalCase | `UserProfile`, `ModalFooter` |

| Files | PascalCase for components, route-driven for pages | `UserProfile.jsx`, `src/app/dashboard/page.jsx` |

| Hooks / functions | camelCase | `useFetchOrders`, `handleSubmit` |

| Variables | camelCase | `orderTotal`, `isLoading` |

| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_BASE_URL` |

### Import Sources

- **UI primitives**: `@muatmuat/ui/*`

- **Shared hooks**: `@muatmuat/hooks/*`

- **Utilities/services**: `@muatmuat/lib/*` or local `@/services/*`

- **Services**: `@/services/*`

### Asset & Image Guidelines

**Critical Rule**: All components must render immediately - always use placeholders first, replace with real assets later.

**Placeholder Implementation**:

- Use `https://picsum.photos/{width}?random={uniqueId}` for ALL images

- Include dimensions, unique random values, and descriptive alt text

- Apply responsive Tailwind classes and wrap zoomable images in `LightboxPreview`

**Example**:

```jsx
// ✅ Correct - renders instantly

<ImageComponent
  src="https://picsum.photos/56?random=2"
  alt="Truck"
  width={56}
  height={56}
  className="rounded-lg border object-cover"
/>
```

**Mock Data Images**: All service mock data must also use Picsum URLs.

### Code Quality Standards

**React Best Practices**:

- Use functional components with hooks (`useState`, `useEffect`, etc.) instead of class components

- Prefer `useState` for local state and lift state up to nearest common ancestor when needed

- Use Context API for shared state when prop drilling becomes cumbersome

- Write readable, well-documented code with consistent formatting (use Prettier and ESLint)

- Implement proper error boundaries and fallback UIs

**Code Organization**:

- Extract repeated logic into custom hooks (e.g., `useModalState`, `useFormValidation`)

- Build complex components by composing simpler ones to reduce duplication

- Keep components focused with single responsibility and minimal file size

### Performance Considerations

**Component Optimization**:

- Use `React.memo` for components that receive same props frequently

- Implement proper dependency arrays in `useEffect` and `useMemo`

- Consider virtualization for very large lists (≈1000+ items)

- Optimize bundle size by using dynamic imports for large components

**Image Optimization**:

- Supply high-resolution assets (≥2× display dimensions) to avoid pixelation

- Use responsive classes when thumbnails must adapt to different breakpoints

- Maintain consistent aspect ratios between thumbnails and full-size images

### Error Handling & Accessibility

**Error Boundaries**:

- Implement proper error boundaries for robust applications

- Provide meaningful fallback UIs when components fail to render

- Log errors appropriately for debugging without exposing sensitive information

**Accessibility**:

- Ensure all interactive elements are keyboard navigable

- Provide meaningful `alt` text for all images

- Use semantic HTML elements appropriately

- Test with screen readers and keyboard navigation

### Development Workflow

**Before Shipping**:

- [ ] Component follows naming conventions and import patterns

- [ ] No template strings in className (use `cn` helper)

- [ ] All images have proper alt text and placeholder URLs

- [ ] Form validation uses Valibot with explicit error messages

- [ ] Error handling implemented for all async operations

- [ ] Accessibility features tested and verified

- [ ] Performance considerations addressed

- [ ] Code formatted with Prettier and passes ESLint

### Why This Matters

Consistent structure and imports make code maintainable. Shared patterns keep implementations predictable. Proper error handling ensures robust user experience. Accessibility standards make applications usable by everyone. Performance optimization provides smooth user interactions.
