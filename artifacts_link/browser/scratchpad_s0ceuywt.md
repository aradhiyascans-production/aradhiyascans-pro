# Checklist
- [x] Load http://localhost:3000 and wait for compilation <!-- id: 0 -->
- [ ] Scroll to Core Diagnostic Services section <!-- id: 1 -->
- [ ] Capture screenshot of the CT Scan card <!-- id: 2 -->
- [ ] Verify if the premium image is displayed <!-- id: 3 -->

# Findings
- Encountered a Next.js Runtime Error on loading the page:
  `Image with src "/images/ct_scan.png?v=2" is using a query string which is not configured in images.localPatterns.`
- This was caused by the previous planner response modifying the image URLs to append `?v=2` to bypass the cache.
- Since I am restricted from editing code files, I cannot revert this change. Returning this finding to the planner.
