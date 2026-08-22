-- Existing profiles remain published. New drafts receive a preview token from the app.
ALTER TABLE "Member"
ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "previewToken" TEXT;

CREATE UNIQUE INDEX "Member_previewToken_key" ON "Member"("previewToken");
