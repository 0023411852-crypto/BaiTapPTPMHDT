'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE_URL } from '@/utils/api';

interface ServicePlanDetail {
  id: string;
  name: string;
  description: string;
  specifications: string;
  qrCodeBase64: string;
  category: {
    name: string;
    description: string;
  };
  prices: {
    id: string;
    billingCycle: number;
    price: number;
  }[];
}

export default function ServicePlanDetailPage() {
  const params = useParams();
  const [plan, setPlan] = useState<ServicePlanDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/ServicePlans/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPlan(data);
        }
      } catch (error) {
        console.error('Failed to fetch service plan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!plan) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gói dịch vụ</h1>
            <Link href="/services" className="text-blue-600 hover:underline">Quay lại danh sách</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const specs = plan.specifications ? JSON.parse(plan.specifications) : {};

  return (
    <>
      <Navbar />
      <div className="bg-background pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
            ← Quay lại danh sách
          </Link>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
                    {plan.category.name}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h1>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                {plan.qrCodeBase64 && (
                  <div className="text-center">
                    <img src={plan.qrCodeBase64} alt="QR Code" className="w-32 h-32 mx-auto rounded-lg border border-gray-200" />
                    <p className="text-xs text-gray-500 mt-2">Quét mã để đặt hàng</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {specs.cpuCores && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">CPU</div>
                    <div className="text-xl font-bold text-gray-900">{specs.cpuCores} vCPU</div>
                  </div>
                )}
                {specs.ramGB && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">RAM</div>
                    <div className="text-xl font-bold text-gray-900">{specs.ramGB} GB</div>
                  </div>
                )}
                {specs.storageGB && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Storage</div>
                    <div className="text-xl font-bold text-gray-900">{specs.storageGB} GB SSD</div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bảng giá</h2>
                <div className="space-y-3">
                  {plan.prices.map((price) => (
                    <div key={price.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {price.billingCycle === 1 ? 'Hàng tháng' : `${price.billingCycle} tháng`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          {price.price.toLocaleString()}₫
                        </div>
                        <Link
                          href={`/checkout?planId=${plan.id}&priceId=${price.id}&billing=${price.billingCycle === 1 ? 'monthly' : 'annual'}`}
                          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Đặt hàng
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
