import 'dotenv/config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errors } from 'celebrate';
import announcementsRouter from './src/routes/announcements.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Announcements API',
      version: '1.0.0',
      description: 'REST API для дошки оголошень',
    },
    components: {
      schemas: {
        Announcement: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Продам ноутбук ASUS' },
            description: {
              type: 'string',
              example: 'Відмінний стан, 16GB RAM',
            },
            price: { type: 'number', example: 18000 },
            category: {
              type: 'string',
              enum: ['sale', 'service', 'job', 'other'],
              example: 'sale',
            },
            contactInfo: { type: 'string', example: '0991234567' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-10T12:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-10T12:00:00.000Z',
            },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 23 },
            page: { type: 'integer', example: 1 },
            totalPages: { type: 'integer', example: 3 },
            perPage: { type: 'integer', example: 10 },
          },
        },
        AnnouncementList: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Announcement' },
            },
            pagination: { $ref: '#/components/schemas/Pagination' },
          },
        },
        CreateAnnouncement: {
          type: 'object',
          required: [
            'title',
            'description',
            'price',
            'category',
            'contactInfo',
          ],
          properties: {
            title: { type: 'string', minLength: 5, maxLength: 100 },
            description: { type: 'string', minLength: 10 },
            price: { type: 'number', minimum: 0, exclusiveMinimum: true },
            category: {
              type: 'string',
              enum: ['sale', 'service', 'job', 'other'],
            },
            contactInfo: { type: 'string', minLength: 5 },
          },
        },
        UpdateAnnouncement: {
          type: 'object',
          minProperties: 1,
          properties: {
            title: { type: 'string', minLength: 5, maxLength: 100 },
            description: { type: 'string', minLength: 10 },
            price: { type: 'number', minimum: 0, exclusiveMinimum: true },
            category: {
              type: 'string',
              enum: ['sale', 'service', 'job', 'other'],
            },
            contactInfo: { type: 'string', minLength: 5 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', example: 400 },
            error: { type: 'string', example: 'Bad Request' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/announcements', announcementsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Announcement not found' });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
