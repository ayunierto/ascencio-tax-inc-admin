# AI Coding Agent Guidelines for Ascencio Tax App + Admin

Welcome to the Ascencio Tax App + Admin codebase! This document provides essential guidelines for AI coding agents to be productive and aligned with the project's architecture and conventions.

## Project Overview

The Ascencio Tax App + Admin is a centralized platform for managing client taxes and accounting processes. It consists of two main parts:

1. **Admin Panel**: Located under `src/admin/`, this section includes components, pages, and utilities for administrative tasks.
2. **Client-Facing App**: Located under `src/app/`, this section includes user-facing components, layouts, and pages.

### Key Architectural Patterns

- **Component-Based Design**: The project follows a modular structure with reusable components organized by domain.
- **Routing**: Routes are defined in `src/app.router.tsx`.
- **State Management**: State is managed locally within components or through hooks.
- **API Integration**: API calls are centralized in `src/api/api.ts`.

## Developer Workflows

### Build and Run

1. Clone `.env.example` to `.env`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Testing

- **Unit Tests**: (Add details if applicable)
- **Integration Tests**: (Add details if applicable)

### Debugging

- Use browser developer tools for debugging React components.
- Check API responses in the network tab.

## Project-Specific Conventions

- **File Naming**: Use `kebab-case` for files and directories.
- **Component Structure**: Each component has its own folder with `index.ts` for exports.
- **Styling**: Global styles are in `src/index.css`. Component-specific styles are scoped.
- **Error Handling**: Centralized in API calls and propagated to components.

## Integration Points

- **API**: All API calls are defined in `src/api/api.ts`. Use this file to add or modify endpoints.
- **Authentication**: Managed under `src/auth/` with actions, components, and schemas.
- **Admin Features**: Located in `src/admin/` with subdirectories for actions, components, hooks, layout, and pages.

## Additional Guidelines for AI Agents

### Key Dependencies and Their Usage

This project uses several libraries and frameworks to enhance functionality and maintainability. Below are some key dependencies and their purposes:

- **React**: Core library for building user interfaces.
- **React Router**: For managing navigation and routing.
- **Zustand**: Lightweight state management.
- **React Hook Form**: For managing forms and validations.
- **Zod**: Schema validation for forms and data.
- **@tanstack/react-query**: For data fetching and caching.
- **Axios**: For making HTTP requests.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Chadcn UI**: Accessible and customizable UI components.
- **Luxon**: For date and time manipulation.

### Project-Specific Requirements

1. **Clean Code and Design Patterns**:

   - Always write clean, maintainable, and scalable code.
   - Follow SOLID principles and design patterns to ensure code quality.

2. **Language**:

   - All text in views and components must be in English.

3. **Scalability and Reusability**:
   - Ensure components are modular and reusable.
   - Avoid hardcoding values; use constants or configuration files where applicable.

### Example Workflows

#### Adding a New Feature (e.g., Appointment Management):

1. Create a new folder under `src/admin/pages/appointments/` for the feature.
2. Use `React Hook Form` and `Zod` for form handling and validation.
3. Fetch or update data using `@tanstack/react-query` and `Axios`.
4. Style the components using `TailwindCSS` and Chadcn UI components.

#### Creating a New API Integration:

1. Define the endpoint in `src/api/api.ts`.
2. Use `Axios` for the HTTP request.
3. Handle caching and state updates with `@tanstack/react-query`.

### Testing and Debugging

- Use `eslint` to ensure code quality.
- Debug React components using browser developer tools.
- Test API calls and data flows with `@tanstack/react-query-devtools`.

### Notes for Agents

- Always prioritize accessibility and performance.
- Ensure that any new code aligns with the existing architecture and conventions.
- Document any significant changes or additions to help future contributors.
- Test new functionalities thoroughly before finalizing any task.
- Take advantage of the existing libraries and frameworks to maintain consistency across the codebase.

## Examples

### Adding a New Admin Page

1. Create a new folder under `src/admin/pages/`.
2. Add the page component (e.g., `NewPage.tsx`).
3. Update the `AdminLayout` or navigation components to include the new page.

### Creating a New API Endpoint

1. Add the endpoint logic in `src/api/api.ts`.
2. Use the endpoint in the relevant component or action.

---

Feel free to iterate on this document as the project evolves. If you encounter unclear patterns or missing details, update this file to help future contributors!
