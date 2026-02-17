-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comments" TEXT,
    "rating" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyerId" INTEGER NOT NULL,
    "itemId" INTEGER,
    "mentorId" INTEGER,
    CONSTRAINT "Review_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("buyerId", "comments", "date", "id", "rating") SELECT "buyerId", "comments", "date", "id", "rating" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE INDEX "Review_buyerId_idx" ON "Review"("buyerId");
CREATE INDEX "Review_itemId_idx" ON "Review"("itemId");
CREATE INDEX "Review_mentorId_idx" ON "Review"("mentorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
