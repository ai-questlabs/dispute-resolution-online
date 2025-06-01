
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  incomeRanges, 
  serviceTypes, 
  entityTypes, 
  calculateFee,
  EntityType,
  ServiceType
} from '@/utils/feeCalculator';
import { CalendarIcon, FileText, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Form schema validation
const serviceRequestSchema = z.object({
  section: z.string().min(1, 'Section is required'),
  noticeDate: z.date({
    required_error: "Notice date is required",
  }),
  responseDate: z.date({
    required_error: "Response date is required",
  }),
  serviceType: z.string({
    required_error: "Service type is required",
  }),
  entityType: z.string({
    required_error: "Entity type is required",
  }),
  incomeRangeId: z.string({
    required_error: "Income/Turnover range is required",
  }),
  residentialStatus: z.string({
    required_error: "Residential status is required",
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormValues = z.infer<typeof serviceRequestSchema>;

const NewServiceRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      section: '',
      description: '',
    },
  });

  // Calculate fee whenever relevant fields change
  const watchServiceType = form.watch('serviceType');
  const watchEntityType = form.watch('entityType');
  const watchIncomeRange = form.watch('incomeRangeId');

  useEffect(() => {
    if (watchServiceType && watchEntityType && watchIncomeRange) {
      const fee = calculateFee(
        parseInt(watchIncomeRange),
        watchEntityType as EntityType,
        watchServiceType as ServiceType
      );
      setCalculatedFee(fee);
    }
  }, [watchServiceType, watchEntityType, watchIncomeRange]);

  const onSubmit = (data: FormValues) => {
    if (!calculatedFee) {
      toast({
        title: "Error",
        description: "Fee calculation failed. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would send this data to an API
    console.log('Submitting service request:', { ...data, fee: calculatedFee });

    toast({
      title: "Success",
      description: "Your service request has been submitted.",
    });

    // Navigate back to dashboard
    navigate('/customer/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/customer/dashboard')}
        className="mb-6 pl-0 flex items-center text-gray-600 hover:text-brand-blue"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Create New Service Request</h1>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Service Request Details</CardTitle>
          <CardDescription>
            Please provide the details for your tax litigation service request
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Section Information */}
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section under which Notice is issued</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the section number" {...field} />
                    </FormControl>
                    <FormDescription>
                      The tax code section under which the notice was issued
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="noticeDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Notice</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Last date of Response</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service Type */}
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nature of Litigation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Entity Type */}
              <FormField
                control={form.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {entityTypes.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Residential Status */}
              <FormField
                control={form.control}
                name="residentialStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select residential status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="resident">Resident</SelectItem>
                        <SelectItem value="non-resident">Non-Resident</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Income Range - Changed to Dropdown */}
              <FormField
                control={form.control}
                name="incomeRangeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Income / Turnover Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {incomeRanges.map((range) => (
                          <SelectItem key={range.id} value={range.id.toString()}>
                            {range.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your request in detail..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide any additional details that may help us understand your case better
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fee Display */}
              {calculatedFee && (
                <div className="bg-brand-blue/5 p-4 rounded-md border border-brand-blue/20">
                  <h3 className="font-medium text-gray-900 mb-2">Service Fee</h3>
                  <p className="text-xl font-bold text-brand-blue">₹ {calculatedFee.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on your entity type, income range, and service type
                  </p>
                </div>
              )}

              {/* Document Upload Section */}
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Supporting Documents
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  You can upload relevant documents after submission in the request details page
                </p>
                <Button type="button" variant="outline" disabled className="w-full">
                  Document Upload (Available after submission)
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/customer/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-blue hover:bg-brand-lightblue">
                Submit Request
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default NewServiceRequest;
