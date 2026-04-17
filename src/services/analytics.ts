/**
 * Basic analytics tracking service.
 * For now, it logs interactions to the console.
 */

export const trackInteraction = (componentName: string, action: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[ANALYTICS] ${timestamp} | Component: ${componentName} | Action: ${action}`, data || '');
};
