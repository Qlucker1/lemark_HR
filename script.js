// script.js
// This file adds interactivity to the RIT Team onboarding page. It handles tab
// navigation for the products section and expands/collapses additional
// employee cards in the team section. The goal is to enhance the user
// experience with unobtrusive JavaScript while keeping the markup semantic.

// Wait until the DOM is ready before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------
   * Tab switching logic for the products section
   *
   * Tabs are implemented as list items with the `.tab` class. Each tab has
   * a `data-tab` attribute that corresponds to the id of a `.tab-pane` in
   * the tab content area. When a tab is clicked we remove the `active`
   * class from all tabs and panes, then activate the clicked tab and
   * corresponding pane. ARIA attributes are updated for accessibility.
   */
  const tabs = document.querySelectorAll('.product-tabs .tab');
  const panes = document.querySelectorAll('.tab-content .tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      // Remove active state from all tabs and panes
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panes.forEach(pane => {
        pane.classList.remove('active');
      });
      // Activate the clicked tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      // Activate the corresponding pane
      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------------
   * Expand/collapse logic for the team section
   *
   * By default only the first row of employee cards is visible. A button
   * labelled "Показать ещё" toggles the visibility of the rest of the
   * cards. We add a CSS class `hidden` to hide elements visually but
   * retain them in the DOM for accessibility. The toggle also updates
   * the button label to reflect the current state.
   */
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    // Determine how many cards to show initially (half of them)
    const cards = Array.from(teamGrid.children);
    const totalCards = cards.length;
    const initialCount = Math.ceil(totalCards / 2);

    // Hide cards beyond the initial count
    cards.forEach((card, index) => {
      if (index >= initialCount) {
        card.classList.add('hidden');
      }
    });

    // Create the toggle button if there are hidden cards
    if (totalCards > initialCount) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'team-toggle';
      toggleBtn.textContent = 'Показать ещё';
      toggleBtn.setAttribute('aria-expanded', 'false');
      // Insert the button after the grid
      teamGrid.parentNode.appendChild(toggleBtn);
      
      toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        // Toggle visibility of hidden cards
        cards.forEach((card, index) => {
          if (index >= initialCount) {
            card.classList.toggle('hidden');
          }
        });
        // Update button state
        toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
        toggleBtn.textContent = isExpanded ? 'Показать ещё' : 'Скрыть';
      });
    }
  }
});