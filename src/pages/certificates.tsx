import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { PageHeader } from "@/components/common/page-header";
import { Seo } from "@/components/common/seo";
import { Section } from "@/components/common/section";
import { routes } from "@/config/routes";
import { contentService } from "@/services/content";

const certificates = contentService.getCertificates();

export function CertificatesPage() {
  return (
    <>
      <Seo
        path={routes.certificates}
        title="Certificates"
        description={certificates.description}
      />

      <Section className="pt-12 md:pt-16">
        <PageHeader
          eyebrow="Learning"
          title="Certificates"
          description={certificates.description}
        />

        <div className="mt-12">
          <CertificateGallery certificates={certificates.items} />
        </div>
      </Section>
    </>
  );
}
