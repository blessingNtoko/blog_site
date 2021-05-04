const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const lodash = require('lodash');

const app = express();
const port = process.env.PORT || 4177;
const posts = [];


app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const homeStartingContent = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam omnis rem, quod consequatur iusto itaque rerum
doloremque illo, nam officia ipsam placeat in ad, quaerat nobis numquam porro excepturi deleniti amet nostrum.`;
const aboutContent = `Impedit quibusdam, repudiandae quo expedita ipsam molestiae vitae doloribus magni, ipsa, aspernatur repellat
distinctio sequi atque eligendi nulla officia aut deleniti iusto excepturi! Quae asperiores tempora libero
repellendus, alias fugit earum facere officia ratione accusamus voluptate voluptas! Aliquid nam.`;
const contactContent = `Saepe obcaecati
adipisci reprehenderit, sunt quia quam ut eius corrupti libero eligendi blanditiis sint repellendus consectetur
aspernatur non tempore ducimus laudantium vitae dolor rem, temporibus distinctio id? Ex, corporis.`;

// ============================================================================ Database & Schema =========================================================================


mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log('Connected to MongoDB');
});

const blogPostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', blogPostSchema);

// ============================================================================ Server Logic - Gets =========================================================================


app.get('/', (req, res) => {
    res.render('home', {
        homeStarterContent: homeStartingContent,
        posts: posts
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        aboutStarterContent: aboutContent
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        contactStarterContent: contactContent
    });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.get('/posts/:postTitle', (req, res) => {
    const paramsPostTitle = lodash.lowerCase(req.params.postTitle);

    posts.forEach(post => {
        if (lodash.lowerCase(post.postTitle) === paramsPostTitle) {
            res.render('post', {
                title: post.postTitle,
                content: post.postBody
            });
        };
    });

});


// ============================================================================ Server Logic - Posts =========================================================================


app.post('/compose', (req, res) => {
    const post = req.body;

    posts.push(post);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});