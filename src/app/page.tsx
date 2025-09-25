import { getFeaturedProperties, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  // Temporary debug - remove after testing
  console.log('Featured properties data:', featuredProperties)

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">PM VILLAS</div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/properties" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Properties</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact Us</Link>
            </div>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">Schedule Tour</Button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link href="/properties" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Properties</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Blog</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Modern */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80"
            alt="Luxury villa in Punta Mita"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Premium Real Estate</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Luxury Living in
              <span className="block text-emerald-400">Punta Mita</span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Discover exceptional oceanfront villas and exclusive properties in Mexico's most prestigious coastal destination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                <Link href="/properties">View Properties</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full">
                Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Luxury Properties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">$50M+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Featured Properties</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Exceptional Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each property is carefully selected for its unique character, prime location, and exceptional value proposition.
            </p>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full max-w-7xl">
                <CarouselContent className="-ml-4">
                  {featuredProperties.map((property: any, index: number) => (
                    <CarouselItem key={property._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 bg-white">
                        {property.mainImage && (
                          <div className="relative h-80 overflow-hidden">
                            <Image
                              src={property.mainImage?.asset?.url || '/placeholder.jpg'}
                              alt={property.mainImage?.alt || property.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            <div className="absolute top-6 left-6">
                              <Badge className="bg-white/90 text-gray-900 font-semibold shadow-lg">
                                ${property.price?.toLocaleString()}
                              </Badge>
                            </div>
                            {index === 0 && (
                              <div className="absolute top-6 right-6">
                                <Badge className="bg-emerald-500 text-white font-semibold">Featured</Badge>
                              </div>
                            )}
                          </div>
                        )}

                        <CardContent className="p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                            {property.title}
                          </h3>

                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-6 text-gray-600">
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span className="font-medium">{property.bedrooms} Beds</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{property.bathrooms} Baths</span>
                              </div>
                            </div>

                            <Badge variant="secondary" className="capitalize font-medium bg-gray-100">
                              {property.propertyType}
                            </Badge>
                          </div>

                          <Link
                            href={`/properties/${property.slug}`}
                            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group-hover:translate-x-2 transition-transform"
                          >
                            View Details
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Navigation Buttons */}
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg" />
              </Carousel>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(featuredProperties.length / 3) }).map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-emerald-400 transition-colors"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No properties yet</h3>
              <p className="text-gray-600 mb-8">Add some luxury properties in your Sanity Studio and mark them as featured to showcase them here.</p>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Add Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let our experts guide you through Punta Mita's most exclusive properties
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full">
              Browse All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-gray-900 mb-4">PM VILLAS</div>
              <p className="text-gray-600 mb-6 max-w-md">
                Your trusted partner for luxury real estate in Punta Mita. Discover exceptional properties in Mexico's most prestigious coastal destination.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/pm.villas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/pm-villas/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="tel:+18473400338" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Luxury Villas</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Oceanfront</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Golf Course</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Investment</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Lagos Del Mar 26, Punta de Mita,</li>
                <li>Nayarit, Mexico 63734</li>
                <li>+1 847-340-0338</li>
                <li>andrew.kubicek@pmvillas.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2025 PM Villas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}