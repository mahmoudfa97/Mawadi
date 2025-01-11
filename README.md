# Mawadi
 A Gift for Every Occasion: Whether it’s a birthday, an anniversary, a corporate event, 
 or just because, our extensive range caters to all your needs.
 From luxurious fragrances and gourmet hampers to unique experiences and elegant jewelry. Mawada is your ultimate gifting partner.  
 More Than Just Flowers: While we love the timeless beauty of flowers, we believe in offering a variety that covers all aspects of gifting. 
 With Mawada, you can find everything you need to make someone’s day special, all in one place. 
 Personal Touch with Every Gift: Enhance your gifting experience with our unique feature that allows you to attach a personalized video message with your gift.
 This thoughtful touch ensures that your sentiments are conveyed beautifully and memorably.

## Proprietary Notice

This project contains proprietary and confidential information. All rights are reserved. 
No part of this project may be reproduced, distributed, or transmitted in any form or by any means, 
including photocopying, recording, or other electronic or mechanical methods, without the prior 
written permission of the owner, except in the case of brief quotations embodied in critical reviews 
and certain other noncommercial uses permitted by copyright law.

For permission requests, please contact +972522498402/leedor97@gmail.com.

## Security Notice

This project contains sensitive data. If you have accidentally gained access to this repository, 
please notify us immediately and delete any copies you may have. Unauthorized access or use of 
this data is strictly prohibited and may be illegal.


## NOTE

The project is an e-commerce platform that allows users to browse, purchase, and manage products online. It features a user-friendly interface for both customers and administrators, enabling seamless interactions and efficient management of products and user accounts.

## Key Features:

1. ***User Registration and Authentication:*** Users can register, log in, and manage their profiles. The platform supports Firebase authentication for secure access.
2. ***Product Management:*** Admin users can create, update, and delete products. They can also manage product categories and view sales data.
3. ***Product Browsing:*** Customers can browse products by categories, view detailed product information, and see related products.
4. ***Shopping Cart and Checkout:*** Users can add products to their cart, adjust quantities, and proceed to checkout with various payment options.
5. ***Wishlist Functionality:*** Users can save products to their wishlist for future reference.
6. ***Responsive Design:*** The platform is designed to be mobile-friendly, ensuring a good user experience across devices.

## Architecture Overview

The project follows a modern web application architecture that separates concerns between the frontend and backend:

Frontend: Built using React, the frontend is responsible for rendering the user interface and handling user interactions. It communicates with the backend via RESTful APIs.

Components: The UI is composed of reusable components (e.g., ProductList, ItemDetails, StaticOffer) that manage specific functionalities.
State Management: Redux is used for managing application state, particularly for user authentication and product data.
Backend: The backend is built using Express.js and serves as the API layer for the application.

Controllers: Each controller (e.g., userController, productController) handles specific routes and business logic related to users and products.
Database: MongoDB is used to store user and product data, allowing for flexible data management and retrieval.
