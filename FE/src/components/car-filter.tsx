import { Filter, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"

interface CarFilterType {
    resetFilters: () => void,
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    filters: {
        type: string,
        fuel: string,
        transmission: string,
        priceRange: number[],
        rating: number,
    },
    setFilters: React.Dispatch<React.SetStateAction<{
        type: string,
        fuel: string,
        transmission: string,
        priceRange: number[],
        rating: number,
    }>>
}
const CarFilter = ({ resetFilters, searchTerm, setSearchTerm, filters, setFilters }: CarFilterType) => {
    return (
        <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center">
                        <Filter className="h-5 w-5 mr-2" />
                        Filters
                    </h2>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                        Clear All
                    </Button>
                </div>

                <div className="space-y-6">
                    {/* Search */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search cars..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Car Type */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Car Type</label>
                        <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Types</SelectItem>
                                <SelectItem value="Sedan">Sedan</SelectItem>
                                <SelectItem value="SUV">SUV</SelectItem>
                                <SelectItem value="Hatchback">Hatchback</SelectItem>
                                <SelectItem value="Convertible">Convertible</SelectItem>
                                <SelectItem value="Coupe">Coupe</SelectItem>
                                <SelectItem value="Electric">Electric</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Fuel Type */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Fuel Type</label>
                        <Select value={filters.fuel} onValueChange={(value) => setFilters({ ...filters, fuel: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select fuel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Fuels</SelectItem>
                                <SelectItem value="Petrol">Petrol</SelectItem>
                                <SelectItem value="Diesel">Diesel</SelectItem>
                                <SelectItem value="Electric">Electric</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Transmission</label>
                        <Select
                            value={filters.transmission}
                            onValueChange={(value) => setFilters({ ...filters, transmission: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select transmission" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Transmissions</SelectItem>
                                <SelectItem value="Automatic">Automatic</SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                        </label>
                        <Slider
                            value={filters.priceRange}
                            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                            max={300}
                            min={0}
                            step={10}
                            className="mt-2"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                        <Select
                            value={filters.rating.toString()}
                            onValueChange={(value) => setFilters({ ...filters, rating: Number.parseFloat(value) })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">All Ratings</SelectItem>
                                <SelectItem value="4">4+ Stars</SelectItem>
                                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                                <SelectItem value="4.8">4.8+ Stars</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CarFilter