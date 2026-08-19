import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Về Chúng Tôi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nhà cung cấp giải pháp Cloud hàng đầu với cam kết chất lượng và độ tin cậy cao nhất
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Lịch Sử Phát Triển</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi bắt đầu với sứ mệnh mang lại giải pháp Cloud chất lượng cao, dễ tiếp cận cho mọi doanh nghiệp.
              Trải qua nhiều năm phát triển, chúng tôi không ngừng nâng cấp hạ tầng và mở rộng dịch vụ để đáp ứng nhu cầu ngày càng cao của khách hàng.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hạ Tầng Datacenter</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vị Trí Chiến Lược</h3>
              <p className="text-gray-700">
                Datacenter được đặt tại các vị trí chiến lược, đảm bảo kết nối mạng ổn định và tốc độ cao.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">An Ninh & Bảo Mật</h3>
              <p className="text-gray-700">
                Hệ thống bảo mật đa lớp, camera giám sát 24/7, kiểm soát ra vào nghiêm ngặt.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Năng Lượng Đủ Đủ</h3>
              <p className="text-gray-700">
                Hệ thống nguồn điện dự phòng, UPS, generator đảm bảo hoạt động liên tục.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Làm Mát Hiện Đại</h3>
              <p className="text-gray-700">
                Hệ thống làm mát hiệu quả, duy trì nhiệt độ ổn định cho thiết bị.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Chứng Chỉ & Tiêu Chuẩn</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-gray-700 mb-4">
              Chúng tôi tuân thủ các tiêu chuẩn quốc tế về chất lượng và bảo mật thông tin.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">ISO 27001</div>
                <div className="text-sm text-gray-600">Quản lý bảo mật thông tin</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">ISO 9001</div>
                <div className="text-sm text-gray-600">Quản lý chất lượng</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">SOC 2</div>
                <div className="text-sm text-gray-600">Bảo mật dịch vụ</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Cam Kết SLA & Uptime</h2>
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-xl text-gray-700">Uptime Guarantee</div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Hỗ trợ kỹ thuật</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">&lt; 15 phút</div>
                <div className="text-gray-600">Thời gian phản hồi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600">Độ sẵn sàng mạng</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
