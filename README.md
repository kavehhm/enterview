## Inspiration
In today's fast-paced world, effective communication is more crucial than ever. Whether it's acing a job interview, delivering a compelling speech, or simply making a persuasive argument, the way we present ourselves can make all the difference. However, the lack of real-time, comprehensive feedback often hinders individuals from realizing their full potential. This inspired us to create Enterview, a tool designed to provide immediate, actionable insights into your emotional and verbal delivery.

## What it does
Enterview is an app that allows users to upload or record a video of themselves speaking. Using Hume AI developer tool, the app analyzes the user's facial expressions and voice to identify various emotions. It then processes this data and serves it as a prompt to OpenAI, which generates personalized feedback. The app also provides a detailed breakdown of the user's emotional shifts, tonal shifts, dominant emotions at various points, and other key metrics. This comprehensive feedback aims to help users identify areas for improvement, whether they are preparing for job interviews, public speaking, or any other situation requiring effective communication.

## How we built it
We used Next.js for full-stack development and used Flask, additionally, for back-end. We then integrated it with Hume's emotion and text recognition API and OpenAI's GPT-3. The architecture is designed to first record and send the video data to Hume, receive the emotion and text metrics on the server side, and then forward this processed data to OpenAI for generating insightful feedback.

## Challenges we ran into
 - API Integration: Ensuring seamless interaction between Hume and OpenAI was initially challenging due to data transfer and formatting issues.
 - Accuracy: We found that emotion recognition could include large amounts of data that may not be useful to the user, which led us to explore ways to define certain interpretations of the data and try and manipulate it in a way that would give us the best possible feedback.

## Accomplishments that we're proud of
 - Holistic Feedback: Successfully integrating Hume and OpenAI to provide a 360-degree view of a user's performance.
 - User Experience: Creating an intuitive, user-friendly interface that even those who are not tech-savvy can navigate easily.
## What we learned
 - Interdisciplinary Integration: The importance of combining different technologies to create a more comprehensive solution.
 - Data Processing: How to determine the usefulness of certain types of data and interpret them in a more efficient way.

## What's next for Enterview
 - Real-Time Analysis: We plan to introduce a real-time feedback feature that provides insights as the user is speaking.
 - Feedback customization Features: Adding options to check for specific types of emotions, and tones and make the feedback more customizable.
 - Expanded Use Cases: We aim to extend the app's utility to other domains like therapy and education.
