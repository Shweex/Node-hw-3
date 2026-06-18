import { Router } from 'express';
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcements.controller.js';
import {
  getAnnouncementsValidator,
  idValidator,
  createAnnouncementValidator,
  updateAnnouncementValidator,
} from '../validators/announcements.validators.js';

const router = Router();

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Отримати список оголошень
 *     tags: [Announcements]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Пошук по назві (нечутливий до регістру)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Сортування за датою створення
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Номер сторінки
 *     responses:
 *       200:
 *         description: Список оголошень з пагінацією
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnnouncementList'
 *       400:
 *         description: Помилка валідації
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAnnouncementsValidator, getAnnouncements);

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Отримати одне оголошення за ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID оголошення
 *     responses:
 *       200:
 *         description: Оголошення знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Невалідний ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Оголошення не знайдено
 */
router.get('/:id', idValidator, getAnnouncementById);

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Створити нове оголошення
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnnouncement'
 *     responses:
 *       201:
 *         description: Оголошення створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Помилка валідації
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createAnnouncementValidator, createAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   patch:
 *     summary: Частково оновити оголошення
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID оголошення
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAnnouncement'
 *     responses:
 *       200:
 *         description: Оголошення оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Помилка валідації
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Оголошення не знайдено
 */
router.patch('/:id', updateAnnouncementValidator, updateAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Видалити оголошення
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID оголошення
 *     responses:
 *       204:
 *         description: Оголошення видалено
 *       400:
 *         description: Невалідний ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Оголошення не знайдено
 */
router.delete('/:id', idValidator, deleteAnnouncement);

export default router;
