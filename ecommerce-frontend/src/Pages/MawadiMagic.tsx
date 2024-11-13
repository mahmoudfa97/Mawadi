'use client'

import React, { useState } from 'react'
import { Loader2, Star, Globe } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '../components/UI/radio-group'
import { Label } from '../components/UI/label'
import { Slider } from '../components/UI/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/UI/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/UI/card'
import { Button } from '../components/UI/button'

type ResponseType = {
  occasion: string;
  personality: string;
  budget: number;
  preferences: string;
}

type QuestionType = {
  id: keyof ResponseType;
  question: {
    en: string;
    ar: string;
  };
  type: 'radio' | 'slider' | 'select';
  options?: {
    en: string[];
    ar: string[];
  };
  min?: number;
  max?: number;
  step?: number;
}

type LanguageType = 'en' | 'ar'

const MawadiMagic: React.FC = () => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<LanguageType>('en')
  const [responses, setResponses] = useState<ResponseType>({
    occasion: '',
    personality: '',
    budget: 50,
    preferences: ''
  })

  const questions: QuestionType[] = [
    {
      id: 'occasion',
      question: {
        en: "What's the occasion?",
        ar: "ما هي المناسبة؟"
      },
      type: 'radio',
      options: {
        en: ['Birthday', 'Anniversary', 'Corporate Event', 'Just Because'],
        ar: ['عيد ميلاد', 'ذكرى سنوية', 'حدث شركة', 'بدون مناسبة']
      }
    },
    {
      id: 'personality',
      question: {
        en: 'What kind of personality does the recipient have?',
        ar: 'ما نوع شخصية المتلقي؟'
      },
      type: 'radio',
      options: {
        en: ['Adventurous', 'Sophisticated', 'Sentimental', 'Creative'],
        ar: ['مغامر', 'راقي', 'عاطفي', 'مبدع']
      }
    },
    {
      id: 'budget',
      question: {
        en: "What's your budget range?",
        ar: "ما هو نطاق ميزانيتك؟"
      },
      type: 'slider',
      min: 10,
      max: 500,
      step: 10
    },
    {
      id: 'preferences',
      question: {
        en: "What are the recipient's preferences?",
        ar: "ما هي تفضيلات المتلقي؟"
      },
      type: 'select',
      options: {
        en: ['Electronics', 'Fashion', 'Books', 'Art', 'Home & Living'],
        ar: ['إلكترونيات', 'أزياء', 'كتب', 'فن', 'المنزل والمعيشة']
      }
    }
  ]

  const handleAnswer = (id: keyof ResponseType, value: string | number) => {
    setResponses(prev => ({ ...prev, [id]: value }))
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1)
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  const renderQuestion = () => {
    const { id, question, type, options, min, max, step: sliderStep } = questions[step]
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{question[language]}</h2>
        {type === 'radio' && options && (
          <RadioGroup onValueChange={(value) => handleAnswer(id, value)} value={`${responses[id]}`}>
            {options[language].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-white">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {type === 'slider' && (
          <div className="space-y-4">
            <Slider
              min={min}
              max={max}
              step={sliderStep}
              value={[responses[id] as number]}
              onValueChange={(value) => handleAnswer(id, value[0])}
              className="w-full"
            />
            <p className="text-white text-center">
              {language === 'en' ? `Selected budget: $${responses[id]}` : `الميزانية المحددة: $${responses[id]}`}
            </p>
          </div>
        )}
        {type === 'select' && options && (
          <Select onValueChange={(value) => handleAnswer(id, value)} value={`${responses[id]}`}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === 'en' ? "Select an option" : "اختر خيارًا"} />
            </SelectTrigger>
            <SelectContent>
              {options[language].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    )
  }

  const renderGiftOptions = () => {
    const giftOptions = [
      { name: { en: 'Smart Watch', ar: 'ساعة ذكية' }, price: 199, image: '/placeholder.svg?height=100&width=100' },
      { name: { en: 'Gourmet Cookbook', ar: 'كتاب طبخ فاخر' }, price: 45, image: '/placeholder.svg?height=100&width=100' },
      { name: { en: 'Wireless Earbuds', ar: 'سماعات لاسلكية' }, price: 129, image: '/placeholder.svg?height=100&width=100' }
    ]

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {giftOptions.map((gift, index) => (
          <Card key={index} className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md">
            <img src={gift.image} alt={gift.name[language]} className="w-24 h-24 object-cover mb-4 rounded-full" />
            <h3 className="text-lg font-semibold text-white">{gift.name[language]}</h3>
            <p className="text-sm text-gray-300">${gift.price}</p>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 md:p-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-500/50 to-blue-500/50 backdrop-blur-lg text-white border-none shadow-xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-4xl md:text-6xl font-bold text-center">
              {language === 'en' ? 'Mawaddi Magic' : 'سحر مودة'}
            </CardTitle>
            <CardDescription className="text-xl text-center text-gray-200">
              {language === 'en' 
                ? 'Answer 4 questions and let AI find you a gift' 
                : 'أجب على 4 أسئلة ودع الذكاء الاصطناعي يجد لك هدية'}
            </CardDescription>
          </div>
          <Button onClick={toggleLanguage} variant="ghost" size="icon">
            <Globe className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <div className="text-center space-y-6">
              <img
                src="/aigift.png"
                alt="Background"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <h1 className="text-3xl md:text-5xl font-bold">
                {language === 'en' ? "Not sure what they're into?" : "غير متأكد مما يحبونه؟"}
              </h1>
              <p className="text-xl">
                {language === 'en' 
                  ? "Let our AI-powered gift finder help you choose the perfect present!" 
                  : "دع مكتشف الهدايا المدعوم بالذكاء الاصطناعي يساعدك في اختيار الهدية المثالية!"}
              </p>
              <Button onClick={() => setStep(1)} className="bg-white text-purple-600 hover:bg-gray-100">
                <Star className="mr-2 h-4 w-4" /> {language === 'en' ? 'Start' : 'ابدأ'}
              </Button>
            </div>
          )}
          {step > 0 && step <= questions.length && !loading && (
            <>
              <div className="mb-8 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / questions.length) * 100}%` }}
                ></div>
              </div>
              {renderQuestion()}
            </>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-16 h-16 animate-spin text-blue-300" />
              <p className="mt-4 text-xl font-semibold">
                {language === 'en' 
                  ? 'AI is processing your answers...' 
                  : 'الذكاء الاصطناعي يعالج إجاباتك...'}
              </p>
            </div>
          )}
          {!loading && step > questions.length && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">
                {language === 'en' 
                  ? 'Here are some gift suggestions based on your answers:' 
                  : 'إليك بعض اقتراحات الهدايا بناءً على إجاباتك:'}
              </h2>
              {renderGiftOptions()}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {step > 0 && step <= questions.length && (
            <Button onClick={handleNext} className="w-full bg-white text-purple-600 hover:bg-gray-100">
              {step === questions.length 
                ? (language === 'en' ? 'Find Gifts' : 'ابحث عن الهدايا')
                : (language === 'en' ? 'Next' : 'التالي')}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default MawadiMagic