import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

const users = new Map(); 
const router = express.Router(); 
const form = multer(); 

async function init_userdb() {
    if (users.size > 0) return; 

    try {
        const data = await fs.readFile('users.json', 'utf-8');
        const usersData = JSON.parse(data);
        usersData.forEach(user => {
            users.set(user.username, user); 
        });
    } catch (error) {
        console.error('Error reading users.json:', error);
    }
}

async function validate_user(username, password) {
    const user = users.get(username);
    if (!user || user.password !== password) return false; 
    return user; 
}

router.post('/login', form.none(), async (req, res) => {
    await init_userdb(); 

    req.session.logged = false; 
    const { username, password } = req.body;

    const user = await validate_user(username, password);
    if (user) {
        if (!user.enabled) {
            return res.status(401).json({
                status: "failed",
                message: `User \`${username}\` is currently disabled`
            });
        } else {
            req.session.username = user.username;
            req.session.role = user.role;
            req.session.logged = true;
            return res.json({
                status: "success",
                user: {
                    username: user.username,
                    role: user.role
                }
            });
        }
    } else {
        return res.status(401).json({
            status: "failed",
            message: "Incorrect username and password"
        });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged) {
        req.session.destroy(); 
        return res.end(); 
    } else {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized"
        });
    }
});

router.get('/me', (req, res) => {
    if (req.session.logged) {
        return res.json({
            status: "success",
            user: {
                username: req.session.username,
                role: req.session.role
            }
        });
    } else {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized"
        });
    }
});

export default router; 