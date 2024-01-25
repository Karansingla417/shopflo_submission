
# Social Media Analytics Microservice

Welcome to the Social Media Insights Microservice project! This microservice is your go-to solution for seamlessly managing, analyzing, and extracting valuable insights from social media posts. Let's dive into the details and the enhancements made to the original project.

## Tech Ecosystem

## Frontend** : Crafted with the trio of HTML, CSS, and JavaScript to ensure an engaging and responsive user interface.

## Backend: Powered by Express.js, the robust Node.js framework that facilitates the creation of efficient and scalable APIs.

## Database: Embracing the reliability and ACID compliance of MySQL, ensuring data integrity for a flawless social media analytics experience.

## Additional Features: Strengthened with IP-based rate limiting for an added layer of security.

## Setup and Run



1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Database:**
   - Create a MySQL database and update the configuration in `config/database.js`.

3. **Run the Application:**
   ```bash
   npm start
   ```
   The application will be accessible at [http://localhost:3000](http://localhost:3001).

## API Endpoints

1. **Post Creation:**
   - Endpoint: `POST /api/v1/posts/`
   - Accepts a JSON payload with text content and a unique identifier.

2. **GET Analysis:**
   - Endpoint: `GET /api/v1/posts/{id}/analysis/`
   - Returns the number of words and average word length in a post.

## Infrastructure and Scaling Write-up

### Database Choice:

MySQL was chosen for its unwavering reliability, ACID compliance, and proficiency in handling intricate queries – a solid foundation for our social media analytics platform.

### Caching Mechanism:

 caching mechanism, starring Redis, takes center stage. It adeptly stores frequently accessed data, cutting down on database load and elevating response times.

### IP-based Rate Limiting:

In the realm of security, IP-based rate limiting emerges as the guardian, thwarting potential abuse and ensuring equitable API usage. A sentinel against potential DDoS threats.

## Assumptions and Decisions

## Tech Ensemble:
Express.js takes the lead with its simplicity, adaptability, and stellar RESTful API building capabilities. MySQL aligns seamlessly with the relational nature of social media posts.



## Scaling Symphony:
Our microservice is meticulously designed with scalability in mind. Horizontal scaling support, coupled with a caching mechanism and rate limiting, forms the backbone of our scalable architecture.

## Security Vigilance:
IP-based rate limiting stands tall as the fortress against security threats. Preventing misuse and ensuring the API isn't inundated by a barrage of requests from a single IP address.


## Caching Finesse:
Our caching prowess revolves around post IDs, offering optimization for retrieval times of frequently accessed posts. It remains unaffected by the content variability, ensuring consistent performance..


```
