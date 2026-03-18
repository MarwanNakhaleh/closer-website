This file is for the LLM to understand what this project is about and how to write the code for it.

## Application overview
Closer is an app for committed couples in their 20s, 30s, and 40s to improve their sex lives. The man in the relationship will sign up and pay for membership, then he will be able to invite his partner for free. I want both users to be able to track orgasms (shared or individual), activities that may improve or degrade their shared sexual experience, and how they feel each time they have sex including their amount of satisfaction. Please feel free to suggest any other ideas of metrics to track to help improve a couple's sex life, but defer to me to approve them or not. Then given the user's behavior, provide LLM-powered coaching for activities that can help improve the couple's sex life. Over time, both users' satisfaction should increase, and they should be happier together as a result. Avoid suggestions that may be harmful at all costs. 

## Feature development
- use specialized agents concurrently whenever possible to maximize efficiency
- break tasks into independent subtasks that can be executed in parallel
- use batch tool call for multiple independent operations
- launch multiple agents simultaneously when their tasks don't depend on each other
- strongly emphasize unit and integration testing whenever possible. This is a consumer app and they're not going to tolerate crashes well
- after completing each feature, review the code you wrore acting as if you are a penetration tester. Look for any potential vulnerabilities in the application and revise any vulnerable areas
- when importing non-Apple libraries, scan for vulnerabilities to make sure there are no high or critical vulnerabilities

## Firebase commands
The project ID is "closer-10276". For any Firebase command that requires a project ID, use the --project flag and pass in that value. 

## Testing
- when opening iOS Simulator, first check if there is an existing Simulator open. If there is, please close the old instance of the simulator so that exactly one instance is running at a time, then open a new instance. The only circumstance in which two should be running is if we are testing both sides of the application. 

## Exiting and picking up later
- When I tell you I am stepping away, please create a new file in Progress/ with a filename like `yyyymmdd-hhmm-<a few words describing what has been completed, separated by hyphens>.md` and fill it in with what has been accomplished so far as well as what's next on your agenda. When I restart, I will ask you to pick up from the latest file.

## Directory structure
- Closer - iOS application code
- Closer.xcodeproj - XCode project configuration
- CloserTests - application code unit tests
- CloserUITests - testing the UI on the app
- EducationalResources - resources to help you understand from a business perspective how to build this application
    - "App Mafia Full Course Outline.pdf" - review this before writing any code to determine if this application could be a commercial success. It doesn't have to make millions of dollars a year, but if you don't think it's possible for this app to make at least $5k/month in profit after six months on the app store, come up with five related app ideas and estimate the probability that each would be your default response if asked to come up with an app that you think could make that amount of profit.
    - links.md - only click on these links if their descriptions seem relevant to the task at hand
- LLMWorkflows
    - for each task you use, when you develop a repeatable process, create a new .md file in this directory describing step-by-step how you completed a task. When performing subsequent tasks, first review your notes from this folder

## Color Scheme

### Brand Colors (CSS Variables)
| Name           | Variable            | Hex       | Usage                                |
|----------------|---------------------|-----------|--------------------------------------|
| Navy Dark      | `--color-navy`      | `#102A43` | Nav, footers, dark backgrounds, text |
| Navy Mid       | `--color-navy-mid`  | `#243B53` | Gradient endpoint, secondary dark bg |
| Teal           | `--color-teal`      | `#2BB3B1` | Primary brand, CTAs, links           |
| Teal Dark      | `--color-teal-dk`   | `#239997` | Hover states, active states          |
| Lavender       | `--color-lavender`  | `#B8C4E0` | Secondary accent                     |
| Light BG       | `--color-bg`        | `#F4F7FA` | Page backgrounds, card backgrounds   |
| White          | `--color-white`     | `#FFFFFF` | Card surfaces, inputs                |
| Text Primary   | `--color-text`      | `#102A43` | Body text on light backgrounds       |
| Text Secondary | `--color-text-2`    | `#486581` | Captions, taglines, secondary text   |
| Text Light     | `--color-text-lt`   | `#FFFFFF` | Text on dark/teal backgrounds        |

### Gradients
- **Brand:** `--gradient-brand` — 135deg from Teal to Lavender
- **Dark:** `--gradient-dark` — 135deg from Navy Dark to Navy Mid

### Typography
- **Headings (all):** DM Serif Display 400
- **Body:** Inter 400
- **UI/Labels:** Inter 500

### Logo
- SVG mark: two crossing S-curves with gradient ring at center
- Improved logo in progress
- See `files/closer-brand-web.md` for full brand system details

- ## Status Tracking

- At the end of EVERY response, you MUST update `.claude/status.json` with the following structure. This file is consumed by an automated morning briefing system.

- ```json
  {
    "project": "Closer Website",
    "last_updated": "<ISO 8601 timestamp>",
    "recently_completed": ["<what was just done in this and recent prompts>"],
    "testing_performed": ["<tests written, run, or verified>"],
    "next_steps": ["<what remains to be done>"]
  }
  ```

  After writing the file, commit and push it:
  ```bash
  git add .claude/status.json && git commit -m "auto: update project status" --no-verify && git push
  ```

  This is mandatory — do not skip this step even if the prompt was minor.
