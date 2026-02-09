-- CreateTable
CREATE TABLE "College" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "department" TEXT,
    "collegeId" INTEGER NOT NULL,
    CONSTRAINT "Student_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Buyer" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Buyer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seller" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Seller_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mentor" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expertiseArea" TEXT,
    CONSTRAINT "Mentor_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mentee" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "interestArea" TEXT,
    CONSTRAINT "Mentee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemName" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "condition" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "buyerId" INTEGER,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("studentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer" ("studentId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comments" TEXT,
    "rating" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyerId" INTEGER NOT NULL,
    CONSTRAINT "Review_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer" ("studentId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestStatus" TEXT NOT NULL,
    "requestSent" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestReceived" DATETIME,
    "mentorId" INTEGER NOT NULL,
    "menteeId" INTEGER NOT NULL,
    CONSTRAINT "Request_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor" ("studentId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Request_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("studentId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Item_sellerId_idx" ON "Item"("sellerId");

-- CreateIndex
CREATE INDEX "Item_buyerId_idx" ON "Item"("buyerId");

-- CreateIndex
CREATE INDEX "Item_categoryId_idx" ON "Item"("categoryId");

-- CreateIndex
CREATE INDEX "Review_buyerId_idx" ON "Review"("buyerId");

-- CreateIndex
CREATE INDEX "Request_mentorId_idx" ON "Request"("mentorId");

-- CreateIndex
CREATE INDEX "Request_menteeId_idx" ON "Request"("menteeId");
