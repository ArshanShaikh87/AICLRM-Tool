# MILESTONE 1
+------------------------------------------------------+
|                     Header                           |
| AI Cover Letter Generator                            |
|------------------------------------------------------|
| Resume                                               |
| [ Large Textarea ]                                   |
| Characters: 0 / 2500                                 |
|                                                      |
| Job Description                                      |
| [ Large Textarea ]                                   |
| Characters: 0 / 2500                                 |
|                                                      |
|             [ Generate Cover Letter ]                |
|------------------------------------------------------|
| Output Section                                       |
| (Empty State)                                        |
+------------------------------------------------------+

# MILESTONE 2

+-------------------+
|    React UI       |
| (App.jsx)         |
+---------+---------+
          |
          | generateCoverLetter()
          |
          v
+-------------------+
| services/api.js   |
| API Client        |
+---------+---------+
          |
          | POST /api/generate
          |
          v
+-------------------+
| api/generate.js   |
| Serverless API    |
+---------+---------+
          |
          | Dummy Response
          |
          v
+-------------------+
| services/api.js   |
+---------+---------+
          |
          v
+-------------------+
| React UI          |
+-------------------+