// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDatabase')

.then(() => console.log('database connected successfully'))

.catch((e) => console.log('not connected', e))

// Function to create the database and collections
async function createDatabaseAndCollections() {
    try {
        await client.connect();
        const db = client.db("studentDatabase");

// Create academic records collection
        const academicRecordsCollection = db.collection("academicRecords");
        const academicRecordsSchema = {
            studentID: { type: "string", required: true },
            name: { type: "string", required: true },
            grades: { type: "array", required: true },
            subjects: { type: "array", required: true },
            additionalInfo: { type: "object", required: false }
        };
        await academicRecordsCollection.insertOne({
            studentID: "12345",
            name: "John Doe",
            grades: [85, 90, 95],
            subjects: ["Math", "Science", "English"],
            additionalInfo: {
                age: 20,
                address: "123 Main St, Anytown, USA"
            }
        });

// Create co-curricular activities collection
        const coCurricularActivitiesCollection = db.collection("coCurricularActivities");
        const coCurricularActivitiesSchema = {
            studentID: { type: "string", required: true },
            name: { type: "string", required: true },
            activityType: { type: "string", required: true },
            duration: { type: "number", required: true },
            achievements: { type: "array", required: false }
        };
        await coCurricularActivitiesCollection.insertOne({
            studentID: "12345",
            name: "John Doe",
            activityType: "Sports",
            duration: 2,
            achievements: ["Champion", "MVP"]
        });

        console.log("Database and collections created successfully.");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// Call the function to create the database and collections
createDatabaseAndCollections();




// Function to perform CRUD operations on academic records collection
async function performCRUDOperationsOnAcademicRecords() {
    try {
        await client.connect();
        const db = client.db("studentDatabase");
        const academicRecordsCollection = db.collection("academicRecords");

        // Create
        const newAcademicRecord = {
            studentID: "67890",
            name: "Jane Doe",
            grades: [90, 95, 100],
            subjects: ["Math", "Science", "English"],
            additionalInfo: {
                age: 22,
                address: "456 Oak St, Anytown, USA"
            }
        };
        const createResult = await academicRecordsCollection.insertOne(newAcademicRecord);
        console.log("Academic record created:", createResult);

        // Read
        const readResult = await academicRecordsCollection.findOne({ studentID: "12345" });
        console.log("Academic record found:", readResult);

        // Update
        const updateResult = await academicRecordsCollection.updateOne({ studentID: "12345" }, { $set: { name: "John Doe Updated" } });
        console.log("Academic record updated:", updateResult);

        // Delete
        const deleteResult = await academicRecordsCollection.deleteOne({ studentID: "67890" });
        console.log("Academic record deleted:", deleteResult);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}