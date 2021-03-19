const express = require('express');
const bodyParse = require('body-parser');
const ejs = require('ejs');
const port = 4177;

const homeStartingContent = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam omnis rem, quod consequatur iusto itaque rerum
doloremque illo, nam officia ipsam placeat in ad, quaerat nobis numquam porro excepturi deleniti amet nostrum.`;
const aboutContent = `Impedit quibusdam, repudiandae quo expedita ipsam molestiae vitae doloribus magni, ipsa, aspernatur repellat
distinctio sequi atque eligendi nulla officia aut deleniti iusto excepturi! Quae asperiores tempora libero
repellendus, alias fugit earum facere officia ratione accusamus voluptate voluptas! Aliquid nam.`;
const contactContent = `Saepe obcaecati
adipisci reprehenderit, sunt quia quam ut eius corrupti libero eligendi blanditiis sint repellendus consectetur
aspernatur non tempore ducimus laudantium vitae dolor rem, temporibus distinctio id? Ex, corporis.`;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`);
});