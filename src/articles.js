const articles = [
    {
      id: '1',
      articleImage: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Article+1',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Author+1',
        name: 'Author 1',
        publishedDate: 'February 18, 2024',
      },
      contents: {
        title: 'Article 1: The Importance of Early Childhood Education',
        tags: ['education', 'early childhood', 'learning'],
        paragraphs: [
          'Early childhood education lays the foundation for lifelong learning and development. During the formative years, children acquire essential cognitive, social, and emotional skills that shape their future success.',
          'Research shows that quality early childhood education programs lead to better academic outcomes, higher graduation rates, and increased earning potential later in life. By investing in early education, society can break the cycle of poverty and inequality.',
          'Furthermore, early childhood education promotes social integration and reduces the risk of delinquency and crime. By providing children with a safe and nurturing environment, we can empower them to become productive members of society.',
          'In today\'s fast-paced world, where technological advancements are reshaping industries, early childhood education must adapt to prepare children for the challenges of tomorrow. By fostering creativity, critical thinking, and problem-solving skills, educators can equip children with the tools they need to thrive in the 21st century.',
          'In conclusion, early childhood education is not just a moral imperative but also an economic necessity. By investing in our children\'s future, we can build a brighter and more prosperous society for generations to come.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+1', author: 'Commenter 1', content: 'Great article!', timestamp: '2024-02-18T10:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+2', author: 'Commenter 2', content: 'I agree!', timestamp: '2024-02-18T11:00:00' },
      ],
      averageRating: 4.5,
    },
    {
      id: '2',
      articleImage: 'https://via.placeholder.com/600x400/FFC300/FFFFFF?text=Article+2',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Author+2',
        name: 'Author 2',
        publishedDate: 'February 20, 2024',
      },
      contents: {
        title: 'Article 2: The Benefits of Outdoor Learning Environments',
        tags: ['education', 'outdoor learning', 'environment'],
        paragraphs: [
          'Outdoor learning environments offer numerous benefits for children\'s physical, mental, and emotional well-being. By providing opportunities for exploration and discovery, outdoor spaces stimulate curiosity and creativity.',
          'Research indicates that exposure to nature enhances cognitive function and academic performance. Children who spend time outdoors exhibit improved attention spans, problem-solving abilities, and decision-making skills.',
          'Moreover, outdoor learning promotes physical health and fitness, reducing the risk of obesity and related health issues. Activities such as running, climbing, and gardening help children develop gross motor skills and coordination.',
          'In addition to academic and physical benefits, outdoor learning fosters social and emotional development. Collaborative activities in natural settings encourage teamwork, communication, and empathy among peers.',
          'In conclusion, integrating outdoor learning into educational programs enriches children\'s learning experiences and promotes holistic development. By connecting with nature, children develop a deep appreciation for the environment and cultivate lifelong habits of stewardship and sustainability.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Commenter+3', author: 'Commenter 3', content: 'Insightful article!', timestamp: '2024-02-20T09:45:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Commenter+4', author: 'Commenter 4', content: 'I learned a lot!', timestamp: '2024-02-20T10:15:00' },
      ],
      averageRating: 3.8,
    },
    {
      id: '3',
      articleImage: 'https://via.placeholder.com/600x400/DAF7A6/000000?text=Article+3',
      authorDetails: {
        image: 'https://via.placeholder.com/100/DAF7A6/000000?text=Author+3',
        name: 'Author 3',
        publishedDate: 'February 22, 2024',
      },
      contents: {
        title: 'Article 3: The Role of Play in Early Childhood Development',
        tags: ['education', 'play', 'child development'],
        paragraphs: [
          'Play is essential for children\'s cognitive, social, and emotional development. Through play, children learn about the world around them, develop problem-solving skills, and build relationships with others.',
          'In early childhood, play serves as a vehicle for exploration and self-expression. By engaging in imaginative play, children develop language skills, creativity, and emotional intelligence.',
          'Research shows that play-based learning environments promote academic readiness and long-term success. Children who have opportunities for unstructured play exhibit higher levels of curiosity, motivation, and resilience.',
          'Furthermore, play fosters social skills such as cooperation, negotiation, and conflict resolution. When children engage in pretend play or collaborative games, they learn to communicate effectively and navigate social interactions.',
          'In conclusion, play is not just a pastime but a fundamental aspect of childhood development. By recognizing the value of play and creating supportive environments for it, educators and parents can nurture children\'s growth and well-being.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/DAF7A6/000000?text=Commenter+5', author: 'Commenter 5', content: 'Great insights!', timestamp: '2024-02-22T08:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/DAF7A6/000000?text=Commenter+6', author: 'Commenter 6', content: 'I agree!', timestamp: '2024-02-22T09:00:00' },
      ],
      averageRating: 4.0,
    },
    {
      id: '4',
      articleImage: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Article+4',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Author+4',
        name: 'Author 4',
        publishedDate: 'February 24, 2024',
      },
      contents: {
        title: 'Article 4: Strategies for Promoting STEM Education',
        tags: ['education', 'STEM', 'technology'],
        paragraphs: [
          'STEM education plays a crucial role in preparing students for the challenges of the 21st century. By integrating science, technology, engineering, and mathematics into the curriculum, educators can foster critical thinking, innovation, and problem-solving skills.',
          'One effective strategy for promoting STEM education is hands-on learning experiences. By engaging students in real-world projects and experiments, educators can make abstract concepts tangible and relevant.',
          'Another approach is to incorporate interdisciplinary learning activities that connect STEM subjects with other disciplines such as art, music, and history. By highlighting the connections between different fields of study, educators can provide students with a holistic understanding of complex issues.',
          'Furthermore, promoting diversity and inclusion in STEM fields is essential for ensuring equitable access to educational and career opportunities. By actively recruiting and supporting underrepresented groups, educators can cultivate a diverse talent pool and drive innovation.',
          'In conclusion, STEM education is essential for empowering students to become future leaders and innovators. By implementing effective teaching strategies and fostering a culture of inclusivity, educators can inspire the next generation of problem-solvers and changemakers.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+7', author: 'Commenter 7', content: 'Informative article!', timestamp: '2024-02-24T10:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+8', author: 'Commenter 8', content: 'I enjoyed reading it!', timestamp: '2024-02-24T11:00:00' },
      ],
      averageRating: 4.2,
    },
    {
      id: '5',
      articleImage: 'https://via.placeholder.com/600x400/FFC300/FFFFFF?text=Article+5',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Author+5',
        name: 'Author 5',
        publishedDate: 'February 26, 2024',
      },
      contents: {
        title: 'Article 5: The Impact of Technology on Education',
        tags: ['education', 'technology', 'digital learning'],
        paragraphs: [
          'Technology has revolutionized the field of education, offering new opportunities for teaching and learning. Digital tools and resources enable educators to personalize instruction, engage students, and facilitate collaboration.',
          'One significant impact of technology on education is the accessibility of information. With the internet and online databases, students have access to a vast array of resources and knowledge at their fingertips.',
          'Moreover, technology facilitates communication and collaboration among students and teachers, breaking down geographical barriers and enabling remote learning opportunities. Virtual classrooms and online forums provide platforms for interactive discussions and knowledge sharing.',
          'Furthermore, educational technology enhances student engagement and motivation by incorporating multimedia elements such as videos, simulations, and interactive games. These interactive experiences cater to different learning styles and promote active participation.',
          'In conclusion, technology has the potential to transform education and empower learners in unprecedented ways. By leveraging digital tools effectively and thoughtfully, educators can create dynamic learning environments that prepare students for success in the digital age.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Commenter+9', author: 'Commenter 9', content: 'Thought-provoking article!', timestamp: '2024-02-26T09:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Commenter+10', author: 'Commenter 10', content: 'I agree with your points!', timestamp: '2024-02-26T10:00:00' },
      ],
      averageRating: 3.9,
    },
    {
      id: '6',
      articleImage: 'https://via.placeholder.com/600x400/DAF7A6/000000?text=Article+6',
      authorDetails: {
        image: 'https://via.placeholder.com/100/DAF7A6/000000?text=Author+6',
        name: 'Author 6',
        publishedDate: 'February 28, 2024',
      },
      contents: {
        title: 'Article 6: Strategies for Fostering Creativity in Schools',
        tags: ['education', 'creativity', 'innovation'],
        paragraphs: [
          'Creativity is a valuable skill that cultivates innovation, problem-solving, and adaptability. In today\'s rapidly changing world, fostering creativity in schools is essential for preparing students for future challenges and opportunities.',
          'One strategy for fostering creativity is to provide students with open-ended projects and assignments that encourage experimentation and exploration. By allowing students to pursue their interests and passions, educators can ignite their creative spark.',
          'Another approach is to create a supportive and inclusive classroom environment where students feel comfortable expressing their ideas and taking risks. By valuing diverse perspectives and encouraging collaboration, educators can nurture a culture of creativity and innovation.',
          'Furthermore, integrating arts and humanities into the curriculum enhances creativity by offering different modes of expression and perspectives. Activities such as music, drama, and visual arts stimulate imagination and critical thinking skills.',
          'In conclusion, fostering creativity in schools is essential for empowering students to become lifelong learners and problem-solvers. By implementing strategies that nurture creativity and innovation, educators can prepare students to thrive in an ever-evolving world.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/DAF7A6/000000?text=Commenter+11', author: 'Commenter 11', content: 'Inspiring article!', timestamp: '2024-02-28T11:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/DAF7A6/000000?text=Commenter+12', author: 'Commenter 12', content: 'I totally agree!', timestamp: '2024-02-28T12:00:00' },
      ],
      averageRating: 4.1,
    },
    {
      id: '7',
      articleImage: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Article+7',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Author+7',
        name: 'Author 7',
        publishedDate: 'March 1, 2024',
      },
      contents: {
        title: 'Article 7: The Importance of Cultural Diversity in Education',
        tags: ['education', 'diversity', 'inclusion'],
        paragraphs: [
          'Cultural diversity enriches the educational experience by exposing students to different perspectives, traditions, and worldviews. In today\'s globalized society, fostering cultural competence is essential for promoting empathy, tolerance, and social cohesion.',
          'One benefit of cultural diversity in education is the opportunity for cross-cultural exchange and learning. By engaging with peers from diverse backgrounds, students gain insights into different cultures and develop a deeper appreciation for diversity.',
          'Moreover, exposure to diverse perspectives enhances critical thinking and problem-solving skills. By examining issues from multiple viewpoints, students learn to think critically and make informed decisions.',
          'Furthermore, promoting cultural diversity prepares students for success in a multicultural world by equipping them with the skills and attitudes needed to navigate diverse environments. By fostering respect and understanding, educators can create inclusive learning environments where all students feel valued and respected.',
          'In conclusion, embracing cultural diversity in education is essential for preparing students to thrive in a globalized society. By celebrating differences and promoting intercultural dialogue, educators can empower students to become responsible global citizens.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+13', author: 'Commenter 13', content: 'Well said!', timestamp: '2024-03-01T08:45:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+14', author: 'Commenter 14', content: 'I agree with your points!', timestamp: '2024-03-01T09:15:00' },
      ],
      averageRating: 3.7,
    },
    {
      id: '8',
      articleImage: 'https://via.placeholder.com/600x400/FFC300/FFFFFF?text=Article+8',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Author+8',
        name: 'Author 8',
        publishedDate: 'March 3, 2024',
      },
      contents: {
        title: 'Article 8: The Role of Teachers in Fostering Lifelong Learning',
        tags: ['education', 'teachers', 'lifelong learning'],
        paragraphs: [
          'Teachers play a crucial role in fostering lifelong learning and personal growth in students. Beyond imparting knowledge, educators serve as mentors, facilitators, and role models who inspire curiosity, resilience, and self-directed learning.',
          'One aspect of teaching that promotes lifelong learning is the cultivation of a growth mindset. By encouraging students to embrace challenges, learn from failures, and persist in the face of obstacles, educators empower them to become lifelong learners who continuously seek knowledge and self-improvement.',
          'Moreover, fostering a love of learning is essential for cultivating lifelong learners. By creating engaging and meaningful learning experiences, educators can ignite students\' curiosity and passion for discovery.',
          'Furthermore, teachers play a critical role in developing students\' metacognitive skills—the ability to monitor, regulate, and evaluate their own learning processes. By teaching students how to set goals, plan strategies, and reflect on their learning, educators equip them with the tools they need to become independent and self-directed learners.',
          'In conclusion, teachers have the power to shape students\' attitudes and behaviors towards learning, laying the foundation for lifelong learning and personal success. By nurturing a supportive learning environment and modeling a passion for learning, educators can inspire students to become lifelong learners who are equipped to thrive in a rapidly changing world.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Commenter+15', author: 'Commenter 15', content: 'Inspiring article!', timestamp: '2024-03-03T10:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FFC300/FFFFFF?text=Commenter+16', author: 'Commenter 16', content: 'I agree with your insights!', timestamp: '2024-03-03T11:00:00' },
      ],
      averageRating: 4.3,
    },
    {
      id: '9',
      articleImage: 'https://via.placeholder.com/600x400/DAF7A6/000000?text=Article+9',
      authorDetails: {
        image: 'https://via.placeholder.com/100/DAF7A6/000000?text=Author+9',
        name: 'Author 9',
        publishedDate: 'March 5, 2024',
      },
      contents: {
        title: 'Article 9: The Power of Inquiry-Based Learning',
        tags: ['education', 'inquiry-based learning', 'curiosity'],
        paragraphs: [
          'Inquiry-based learning is a student-centered approach that promotes active engagement, critical thinking, and lifelong learning. By encouraging students to ask questions, investigate problems, and construct their own knowledge, educators empower them to become independent and self-directed learners.',
          'One benefit of inquiry-based learning is its ability to foster curiosity and creativity in students. By posing open-ended questions and encouraging exploration, educators stimulate students\' natural curiosity and inspire them to pursue knowledge and understanding.',
          'Moreover, inquiry-based learning promotes deeper understanding and retention of content knowledge. By actively engaging in the learning process and making connections between new information and prior knowledge, students develop a more profound and enduring understanding of concepts.',
          'Furthermore, inquiry-based learning enhances students\' critical thinking and problem-solving skills. By analyzing evidence, evaluating arguments, and synthesizing information, students learn to think critically and make informed decisions.',
          'In conclusion, inquiry-based learning is a powerful educational approach that empowers students to become lifelong learners and critical thinkers. By fostering curiosity, creativity, and independence, educators can prepare students to thrive in a complex and ever-changing world.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/DAF7A6/000000?text=Commenter+17', author: 'Commenter 17', content: 'Great article!', timestamp: '2024-03-05T09:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/DAF7A6/000000?text=Commenter+18', author: 'Commenter 18', content: 'I enjoyed reading it!', timestamp: '2024-03-05T10:00:00' },
      ],
      averageRating: 4.4,
    },
    {
      id: '10',
      articleImage: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Article+10',
      authorDetails: {
        image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Author+10',
        name: 'Author 10',
        publishedDate: 'March 7, 2024',
      },
      contents: {
        title: 'Article 10: The Role of Emotional Intelligence in Education',
        tags: ['education', 'emotional intelligence', 'social-emotional learning'],
        paragraphs: [
          'Emotional intelligence plays a vital role in academic success, personal well-being, and interpersonal relationships. By developing emotional intelligence skills, students learn to recognize, understand, and manage their emotions effectively.',
          'One aspect of emotional intelligence that is crucial for education is self-awareness. By understanding their strengths, weaknesses, and emotions, students can set realistic goals, make informed decisions, and adapt to changing situations.',
          'Moreover, emotional intelligence enables students to develop strong interpersonal skills such as empathy, communication, and conflict resolution. By fostering positive relationships with peers and teachers, students create supportive learning environments where they feel valued and respected.',
          'Furthermore, emotional intelligence enhances students\' ability to cope with stress and adversity, leading to improved mental health and well-being. By teaching students stress management techniques and resilience strategies, educators empower them to overcome challenges and thrive in academic and personal life.',
          'In conclusion, emotional intelligence is a critical skill that promotes academic achievement, mental health, and social success. By integrating social-emotional learning into the curriculum and creating a culture of empathy and support, educators can equip students with the skills they need to succeed in school and beyond.'
        ],
      },
      comments: [
        { id: '1', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+19', author: 'Commenter 19', content: 'Insightful article!', timestamp: '2024-03-07T08:30:00' },
        { id: '2', imgLink: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Commenter+20', author: 'Commenter 20', content: 'I agree with your points!', timestamp: '2024-03-07T09:00:00' },
      ],
      averageRating: 4.6,
    },
];

export default articles;