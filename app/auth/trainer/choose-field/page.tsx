'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface Field {
    id: string;
    title: string;
    description: string;
    icon: string;
    rating: number;
    students: number;
}

export default function ChooseFieldPage() {
    const router = useRouter();
    const [selectedField, setSelectedField] = useState('');
    const [error, setError] = useState('');

    const fields: Field[] = [
        {
            id: 'programming',
            title: 'Programming & Development',
            description: 'Learn to build software, websites, and apps',
            icon: '💻',
            rating: 4.5,
            students: 1250
        },
        {
            id: 'design',
            title: 'UI/UX Design',
            description: 'Create beautiful and user-friendly interfaces',
            icon: '🎨',
            rating: 4.3,
            students: 890
        },
        {
            id: 'data-science',
            title: 'Data Science & Analytics',
            description: 'Analyze data and build machine learning models',
            icon: '📊',
            rating: 4.6,
            students: 675
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity',
            description: 'Protect systems and networks from threats',
            icon: '🔒',
            rating: 4.4,
            students: 520
        },
        {
            id: 'marketing',
            title: 'Digital Marketing',
            description: 'Master online marketing and social media',
            icon: '📱',
            rating: 4.2,
            students: 980
        }
    ];

    const handleFieldSelect = (fieldId: string) => {
        setSelectedField(fieldId);
        setError('');
    };

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedField) {
            setError('Please select a field to continue');
            return;
        }

        console.log('Selected field:', selectedField);
        // Store selected field
        localStorage.setItem('selectedField', selectedField);
        router.push('/auth/trainer/referral');
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-gray-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Left side - Form */}
            <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-auto">
                <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
                    {/* Go back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs font-black   ">Go back</span>
                    </button>

                    <div className="flex flex-col items-center justify-center flex-1">
                        {/* Logo */}
                        <div className="mb-8">
                            <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-600/20">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
                            Select Field
                        </h1>
                        <p className="text-gray-500 mb-10 text-center text-sm">
                            Choose your specialized path in the Academy.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleContinue} className="w-full">
                            <div className="space-y-3 mb-8">
                                {fields.map((field) => (
                                    <div
                                        key={field.id}
                                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${selectedField === field.id
                                            ? 'border-gray-600 bg-gray-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                        onClick={() => handleFieldSelect(field.id)}
                                    >
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-sm transition-colors ${selectedField === field.id ? 'bg-gray-600 text-white' : 'bg-gray-50'
                                            }`}>
                                            {field.icon}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className={`text-sm font-semibold ${selectedField === field.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {field.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {field.students.toLocaleString()} Students Enrolled
                                            </p>

                                            <div className="flex items-center gap-2 mt-2">
                                                {renderStars(field.rating)}
                                                <span className="text-[10px] font-medium text-gray-600  ">Top Field</span>
                                            </div>
                                        </div>

                                        {selectedField === field.id && (
                                            <CheckCircle className="w-5 h-5 text-gray-600" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {error && <p className="mb-4 text-xs font-medium text-gray-500 text-center">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all active:scale-95"
                            >
                                Continue
                            </button>

                            {/* Progress dots */}
                            <div className="flex justify-center gap-2 pt-6">
                                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                    <div key={i} className={`h-2 rounded-full transition-all ${i === 5 ? 'w-8 bg-gray-600' : 'w-2 bg-gray-300'}`}></div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>


                {/* Footer */}
                <div className="text-sm text-gray-500">
                    © Dreamize 2025
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block flex-[1] relative overflow-hidden">
                <Image
                    src="/auth/login/image.png"
                    alt="Lake house reflection"
                    fill
                    className="object-cover object-center scale-105"
                    priority
                    quality={100}
                />
            </div>
        </div>
    );
}
