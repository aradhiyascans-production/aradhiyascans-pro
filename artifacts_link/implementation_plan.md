# Responsive Admin Control Panel Implementation Plan

Optimize the Administrative Control Panel dashboard (`src/app/admin/page.tsx`) to render beautifully and operate efficiently on all viewports, including mobile, tablet, and desktop screens.

## User Review Required

> [!IMPORTANT]
> **Key Enhancements Overview**
> 1. **Container Padding Adjustments**: Outer paddings scale from `px-4 py-8` on mobile to `px-6 py-12 lg:py-16` on larger viewports.
> 2. **Flexible Headers**: Tab header blocks containing titles and actions (such as adding diagnostic tests or health packages) will stack vertically on mobile screens and align horizontally on tablet/desktop views.
> 3. **Form Formatting**: Form elements and action buttons (Cancel/Save) will scale dynamically. Form actions stack vertically to offer large, accessible touch targets on mobile.
> 4. **Scrollable Tables**: Listing tables will be wrapped in horizontal-scroll containers (`overflow-x-auto`) with a minimum width on the table itself to prevent data columns from squishing on narrow layouts.
> 5. **Categorized Inputs**: The nested package category addition controls inside Wellness Packages will adjust stack patterns on smaller viewports.

---

## Open Questions

*No open questions at this stage. The proposed styles leverage the application's existing Tailwind CSS utility framework.*

---

## Proposed Changes

### Admin Dashboard Pages

#### [MODIFY] [page.tsx](file:///d:/All%20Projects/Aaradhya%20Scans/src/app/admin/page.tsx)
* **Outer Container Padding**:
  * Update main background wrapper at line 73: `py-12 lg:py-16` -> `py-8 sm:py-12 lg:py-16`.
  * Update container wrapper at line 74: `px-6` -> `px-4 sm:px-6`.
* **Welcome Banner & operational summary padding**:
  * In `TabOverview`, update welcome container at line 212: `p-8` -> `p-5 sm:p-8`.
  * Update operational sync banner at line 248: `p-8` -> `p-5 sm:p-8`.
* **Tab 2: Diagnostic Tests Form & Catalog**:
  * Update tab header at lines 398–411 to stack vertically on mobile: `flex items-center justify-between text-left` -> `flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left`. Add `self-start sm:self-auto` to the "Add Test" button.
  * Update form panel container padding at line 414: `p-8` -> `p-5 sm:p-8`.
  * Update Cancel/Save button footer at lines 539–553 to stack vertically on mobile: `flex justify-end gap-2` -> `flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-2`, and add `w-full sm:w-auto` to the Cancel and Save buttons.
  * Update test listings panel padding at line 559: `p-8` -> `p-5 sm:p-8`.
  * Wrap the tests table at lines 577–578 in `overflow-x-auto w-full` and give the table a `min-w-[700px]` constraint to allow smooth horizontal scrolling.
* **Tab 3: Wellness Packages Form & Catalog**:
  * Update tab header at lines 875–888 to stack: `flex items-center justify-between text-left` -> `flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left`. Add `self-start sm:self-auto` to the "Add Package" button.
  * Update form panel container padding at line 891: `p-8` -> `p-5 sm:p-8`.
  * Update "Add Category" input control row at lines 1013–1029 to stack vertically on mobile: `flex gap-2` -> `flex flex-col sm:flex-row gap-2.5`, and make buttons/inputs full-width on mobile.
  * Update Cancel/Save button footer at lines 1138–1152 to stack: `flex justify-end gap-2` -> `flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-2`, and add `w-full sm:w-auto` to the buttons.
  * Update packages listing panel padding at line 1158: `p-8` -> `p-5 sm:p-8`.
  * Wrap the packages table at lines 1176–1177 in `overflow-x-auto w-full` and set a `min-w-[800px]` constraint on the table.
* **Admin Login Screen**:
  * Update outer viewport padding at line 1288: `px-6` -> `px-4 sm:px-6`.
  * Update login card padding at line 1289: `p-8` -> `p-6 sm:p-8`.

---

## Verification Plan

### Automated Tests
* Run `npx tsc --noEmit` to verify TypeScript type-checking and component compilations compile successfully.

### Manual Verification
* Access the admin portal at `/admin` (using the mobile responsive view in Chrome/Firefox devtools).
* Verify that:
  * The login panel fits cleanly on small screens (down to 320px).
  * Dashboard sidebar toggles cleanly on mobile (using the Menu dropdown banner) and matches layout configurations.
  * Form views for adding/editing tests and packages have padded spacing that dynamically sizes (`p-5` vs `p-8`).
  * Action buttons (Save/Cancel/Add Category) are stackable full-width targets on mobile.
  * Table listings scroll horizontally on narrow screens without breaking the main layout bounds or forcing page overflow.
